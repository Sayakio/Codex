import * as THREE from "./three.module.min.js";

export function createNebula(home) {
    const host = home.querySelector(".home-cosmos__media");
    const events = new AbortController();
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false, powerPreference: "low-power" });
    renderer.setClearColor(0x050709);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    host.append(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.z = 16;
    const galaxy = new THREE.Group();
    galaxy.rotation.set(0.72, -0.2, -0.35);
    // Rotate the complete composition, including its offset, in the screen plane.
    const galaxyPivot = new THREE.Group();
    galaxyPivot.rotation.z = Math.PI;
    galaxyPivot.add(galaxy);
    scene.add(galaxyPivot);

    // Seeded particles keep the composition stable across reloads and fallback captures.
    let seed = 2026;
    const random = () => {
        seed = (1664525 * seed + 1013904223) >>> 0;
        return seed / 4294967296;
    };
    const count = matchMedia("(max-width: 760px)").matches ? 12500 : 24000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const dust = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        const radius = Math.pow(random(), 1.25) * 5.5 + 0.03;
        const arm = (i % 4) * Math.PI / 2;
        const spread = random() + random() + random() - 1.5;
        const angle = arm + radius * 1.15 + spread * (i % 5 === 0 ? 2.8 : 0.38);
        positions.set([radius, angle, (random() - 0.5) * (0.2 + radius * 0.12)], i * 3);
        const warm = random() > 0.79;
        const core = Math.exp(-radius * 0.6);
        colors.set(warm ? [1, 0.72 + core * 0.2, 0.5 + core * 0.4] : [0.65 + core * 0.35, 0.82 + core * 0.18, 1], i * 3);
        dust[i] = random() < 0.24 ? 1 : 0;
        sizes[i] = dust[i] ? 14 + random() * 26 : (random() > 0.97 ? 9 + random() * 6 : 1.6 + random() * 3.1);
        phases[i] = random() * Math.PI * 2;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aDust", new THREE.BufferAttribute(dust, 1));
    const uniforms = {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uPointer: { value: new THREE.Vector2() },
        uPointerStrength: { value: 0 },
        uViewport: { value: new THREE.Vector2(1, 1) },
    };
    const material = new THREE.ShaderMaterial({
        uniforms, vertexColors: true, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
            uniform float uTime;
            uniform float uPixelRatio;
            attribute float aSize;
            attribute float aPhase;
            attribute float aDust;
            varying vec3 vColor;
            varying float vDust;
            varying float vLight;
            void main() {
                float r = position.x;
                float t = uTime;
                float a = position.y + t * (0.065 + 0.15 / (r + 1.0));
                float wave = sin(r * 1.8 - t * 0.35 + position.y * 2.0);
                r += wave * 0.15 * smoothstep(0.2, 2.0, r);
                a += sin(t * 0.22 + r * 1.3) * 0.09;
                vec3 p = vec3(cos(a) * r, sin(a) * r, position.z);
                p.z += sin(a * 3.0 + r - t * 0.3) * r * 0.085;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                gl_PointSize = clamp(aSize * uPixelRatio * 12.0 / -mv.z, 1.0, 48.0);
                vColor = color;
                vDust = aDust;
                vLight = 0.72 + 0.28 * sin(aPhase + t * 0.65);
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            varying float vDust;
            varying float vLight;
            void main() {
                float r = length(gl_PointCoord - 0.5) * 2.0;
                if (r > 1.0) discard;
                float glow = exp(-r * r * 5.0) * (1.0 - smoothstep(0.65, 1.0, r));
                float alpha = mix(0.9, 0.016, vDust) * glow * vLight;
                gl_FragColor = vec4(vColor, alpha);
            }
        `,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false; // Positions are polar coordinates until the vertex shader runs.
    galaxy.add(points);
    const starCount = 8888;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
        let x = random() * 2 - 1;
        // A loose diagonal star stream adds depth to the otherwise empty margins.
        let y = i % 2 === 0 ? Math.sin(x * 2.4) * 0.45 + (random() - 0.5) * 0.5 : random() * 2 - 1;
        // Redistribute a small part of the star stream toward the quieter corners.
        if (i % 10 === 0) {
            const side = i % 20 === 0 ? -1 : 1;
            x = side * (0.15 + Math.abs(x) * 0.7);
            y = -side * (0.2 + Math.abs(y) * 0.7);
        }
        starPositions.set([x, y, -8 - random() * 6], i * 3);
        starColors.set(random() > 0.8 ? [1, 0.8, 0.6] : [0.64, 0.79, 1], i * 3);
        starSizes[i] = random() > 0.965 ? 8 + random() * 5 : 1.4 + random() * 2.2;
        starPhases[i] = random() * Math.PI * 2;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute("aSize", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute("aPhase", new THREE.BufferAttribute(starPhases, 1));
    const starMaterial = new THREE.ShaderMaterial({
        uniforms, vertexColors: true, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
            uniform float uTime;
            uniform float uPixelRatio;
            uniform vec2 uPointer;
            uniform float uPointerStrength;
            uniform vec2 uViewport;
            attribute float aSize;
            attribute float aPhase;
            varying vec3 vColor;
            varying float vLight;
            void main() {
                float drift = uTime * 0.12 + aPhase;
                vec3 p = position;
                p.x += sin(drift + position.y * 2.0) * 0.055;
                p.y += cos(drift * 1.17 + position.x * 1.4) * 0.045;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
                // Screen-space distance keeps the interaction circular at every aspect ratio.
                vec2 cursor = vec2(uPointer.x, -uPointer.y) * 2.0;
                vec2 delta = (gl_Position.xy / gl_Position.w - cursor) * uViewport * 0.5;
                float distance = length(delta);
                float influence = 1.0 - smoothstep(0.0, 90.0, distance);
                vec2 offset = delta / max(distance, 1.0) * influence * 26.0 * uPointerStrength;
                gl_Position.xy += offset * 2.0 / uViewport * gl_Position.w;
                gl_PointSize = aSize * uPixelRatio;
                vColor = color;
                vLight = 0.65 + 0.25 * sin(aPhase + uTime * 0.35);
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            varying float vLight;
            void main() {
                vec2 p = abs(gl_PointCoord - 0.5) * 2.0;
                float r = length(p);
                if (r > 1.0) discard;
                float light = exp(-r * r * 5.0);
                light += 0.3 * exp(-min(p.x, p.y) * 24.0) * (1.0 - r);
                gl_FragColor = vec4(vColor, light * vLight);
            }
        `,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    let frame = null;
    let previousTime = 0;
    let visible = true;
    let contextLost = false;
    let disposed = false;
    const pointer = new THREE.Vector2();
    let pointerActive = false;
    const shouldAnimate = () => visible && !document.hidden && !contextLost && !disposed;
    const draw = () => renderer.render(scene, camera);
    const tick = now => {
        frame = null;
        if (!shouldAnimate()) return;
        const elapsed = previousTime ? Math.min((now - previousTime) / 1000, 0.08) : 0;
        previousTime = now;
        uniforms.uTime.value += elapsed;
        if (pointerActive) uniforms.uPointer.value.copy(pointer);
        const pointerBlend = 1 - Math.exp(-elapsed * 10);
        uniforms.uPointerStrength.value += (Number(pointerActive) - uniforms.uPointerStrength.value) * pointerBlend;
        galaxy.rotation.x += (0.72 + pointer.y * 0.18 - galaxy.rotation.x) * 0.035;
        galaxy.rotation.y += (-0.2 + pointer.x * 0.2 - galaxy.rotation.y) * 0.035;
        draw();
        frame = requestAnimationFrame(tick);
    };
    const syncMotion = () => {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        previousTime = 0;
        if (shouldAnimate()) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        renderer.setSize(width, height, false);
        uniforms.uViewport.value.set(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const scale = Math.min(1, camera.aspect * 1.02);
        const spread = THREE.MathUtils.smoothstep(camera.aspect, 0.8, 1.7);
        galaxy.scale.set(scale * (1 + spread * 0.24), scale * (1 + spread * 0.04), scale);
        galaxy.position.y = camera.aspect < 1 ? -0.25 : -0.8;
        const backgroundHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 30;
        stars.scale.set(backgroundHeight * camera.aspect, backgroundHeight, 1);
        if (!contextLost) draw();
    };
    home.addEventListener("pointermove", event => {
        if (event.pointerType !== "mouse" || !shouldAnimate()) return;
        const rect = home.getBoundingClientRect();
        pointerActive = true;
        pointer.set((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5);
    }, { signal: events.signal });
    home.addEventListener("pointerleave", () => {
        pointerActive = false;
        pointer.set(0, 0);
    }, { signal: events.signal });
    document.addEventListener("visibilitychange", syncMotion, { signal: events.signal });
    renderer.domElement.addEventListener("webglcontextlost", event => {
        event.preventDefault();
        contextLost = true;
        renderer.domElement.style.visibility = "hidden";
        syncMotion();
    }, { signal: events.signal });
    renderer.domElement.addEventListener("webglcontextrestored", () => {
        contextLost = false;
        renderer.domElement.style.visibility = "";
        resize();
        syncMotion();
    }, { signal: events.signal });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        syncMotion();
    });
    visibilityObserver.observe(home);
    resize();
    syncMotion();

    return () => {
        disposed = true;
        if (frame !== null) cancelAnimationFrame(frame);
        events.abort();
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        geometry.dispose();
        material.dispose();
        starGeometry.dispose();
        starMaterial.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
    };
}
