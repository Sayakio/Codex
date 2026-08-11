---
Status: true
Field:
Year: 2000
DOI: 10.1145/344779.344936
Tags: []
Authors: HanspeterPfister, MatthiasZwicker, Jeroenvan Baar, MarkusGross
Type: conferencePaper
Citekey: Surfel
---

# Surfels: surface elements as rendering primitives

## ABSTRACT
Surface elements (surfels) are a powerful paradigm to efficiently render complex geometric objects at interactive frame rates. Unlike classical surface discretizations, i.e., triangles or quadrilateral meshes, surfels are point primitives without explicit connectivity. Surfel attributes comprise depth, texture color, normal, and others. As a pre-process, an octree-based surfel representation of a geometric object is computed. During sampling, surfel positions and normals are optionally perturbed, and different levels of texture colors are prefiltered and stored per surfel. During rendering, a hierarchical forward warping algorithm projects surfels to a z-buffer. A novel method called visibility splatting determines visible surfels and holes in the z-buffer. Visible surfels are shaded using texture filtering, Phong illumination, and environment mapping using per-surfel normals. Several methods of image reconstruction, including supersampling, offer flexible speed-quality tradeoffs. Due to the simplicity of the operations, the surfel rendering pipeline is amenable for hardware implementation. Surfel objects offer complex shape, low rendering cost and high image quality, which makes them specifically suited for low-cost, real-time graphics, such as games.

## FILES & LINKS
- **URL:**  [Open Online](https://dl.acm.org/doi/10.1145/344779.344936)
- **Zotero Entry:** [PDF](zotero://select/library/items/VJRRTQ7Y)


## 1. PROBLEMS



## 2. METHOD
### Definition
**面元（Surfel）** 名称来源于 **表面元素（Surface Element）** 的缩写，将其定义如下：

??? note "Definition"
	面元是一个 $0$ 维 $n$ 元组，具有形状和着色属性，以局部近似物体表面。


### Sampling



## 3. EXPERIMENTS



## 4. THINKING

