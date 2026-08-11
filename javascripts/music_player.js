const MUSIC_ICON = `<svg viewBox="0 0 24 24"><path d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8,12 6,14 6,16.5C6,19 8,21 10.5,21C13,21 15,19 15,16.5V6H19V3H12Z" /></svg>`;
const MUSIC_TRACKS = [
    {
        name: "Farewell",
        artist: "Lena Raine",
        url: "https://dn720601.ca.archive.org/0/items/lena-raine-celeste-farewell-original-soundtrack/Lena%20Raine%20-%20Celeste-%20Farewell%20%28Original%20Soundtrack%29%20FLAC/Lena%20Raine%20-%20Celeste-%20Farewell%20%28Original%20Soundtrack%29%20-%2010%20Farewell.mp3",
        cover: "https://ia601405.us.archive.org/18/items/lena-raine-celeste-farewell-original-soundtrack/cover_thumb.jpg"
    },
    {
        name: "The Empty Space Above",
        artist: "Lena Raine",
        url: "https://dn720601.ca.archive.org/0/items/lena-raine-celeste-farewell-original-soundtrack/Lena%20Raine%20-%20Celeste-%20Farewell%20%28Original%20Soundtrack%29%20FLAC/Lena%20Raine%20-%20Celeste-%20Farewell%20%28Original%20Soundtrack%29%20-%2001%20The%20Empty%20Space%20Above.mp3",
        cover: "https://ia601405.us.archive.org/18/items/lena-raine-celeste-farewell-original-soundtrack/cover_thumb.jpg"
    },
    {
        name: "wavedash.ppt",
        artist: "Lena Raine",
        url: "https://dn720601.ca.archive.org/0/items/lena-raine-celeste-farewell-original-soundtrack/Lena%20Raine%20-%20Celeste-%20Farewell%20%28Original%20Soundtrack%29%20FLAC/Lena%20Raine%20-%20Celeste-%20Farewell%20%28Original%20Soundtrack%29%20-%2013%20wavedash.ppt.mp3",
        cover: "https://ia601405.us.archive.org/18/items/lena-raine-celeste-farewell-original-soundtrack/cover_thumb.jpg"
    },
    {
        name: "Golden Ridge (Golden Feather Mix)",
        artist: "in love with a ghost",
        url: "https://dn721905.ca.archive.org/0/items/kuraine-celeste-b-sides-07-summit-no-more-running-mix/in%20love%20with%20a%20ghost%20-%20Celeste%20B-Sides%20-%2004%20Golden%20Ridge%20%28Golden%20Feather%20Mix%29.mp3",
        cover: "https://ia800406.us.archive.org/29/items/kuraine-celeste-b-sides-07-summit-no-more-running-mix/cover_thumb.jpg"
    },
    {
        name: "Journey of a Lifetime ~ Frieren Main Theme",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-01%20Journey%20of%20a%20Lifetime%20~%20Frieren%20Main%20Theme.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "The End of One Journey",
        artist: "Evan Call",
        url: "archive.org/download/frieren-beyond-journeys-end-ost/1-02%20The%20End%20of%20One%20Journey.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "A Well-Earned Celebration",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-04%20A%20Well-Earned%20Celebration.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "For 1000 Years",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-05%20For%201000%20Years.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "One Last Adventure",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-06%20One%20Last%20Adventure.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Farewell, My Friend",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-07%20Farewell%2C%20My%20Friend.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Departures",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-08%20Departures.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Time Flows Ever Onward",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-09%20Time%20Flows%20Ever%20Onward.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "The Precious Moments We Share",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-11%20The%20Precious%20Moments%20We%20Share.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Life Is Worth Living",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-12%20Life%20Is%20Worth%20Living.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Before the Light Fades",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-13%20Before%20the%20Light%20Fades.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Grassy Turtles and Seed Rats",
        artist: "Evan Call",
        url: "https://dn710102.ca.archive.org/0/items/frieren-beyond-journeys-end-ost/1-14%20Grassy%20Turtles%20and%20Seed%20Rats.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Where the Blue-Moon Weed Grows",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-15%20Where%20the%20Blue-Moon%20Weed%20Grows.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Growing Up",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-16%20Growing%20Up.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Phantoms of the Dead",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-17%20Phantoms%20of%20the%20Dead.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Evolution of Magic",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-20%20Evolution%20of%20Magic.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "In Times of Peace",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-21%20In%20Times%20of%20Peace.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "The Land Where Souls Rest",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-22%20The%20Land%20Where%20Souls%20Rest.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Where Hidden Magic Sleeps",
        artist: "Evan Call",
        url: "https://dn710102.ca.archive.org/0/items/frieren-beyond-journeys-end-ost/1-23%20Where%20Hidden%20Magic%20Sleeps.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Goodbye For Now, Eisen",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-25%20Goodbye%20For%20Now%2C%20Eisen.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "More Than Mere Tales",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-26%20More%20Than%20Mere%20Tales.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "The Warrior's Path",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-27%20The%20Warrior%27s%20Path.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Fear Brought Me This Far",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-28%20Fear%20Brought%20Me%20This%20Far.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Dragon Smasher",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-29%20Dragon%20Smasher.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Lift My Head From Shadow",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-30%20Lift%20My%20Head%20From%20Shadow.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Life and Legacy",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-31%20Life%20and%20Legacy.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Memories For My Master",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-32%20Memories%20For%20My%20Master.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "To Travel For Aureole",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-33%20To%20Travel%20For%20Aureole.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Beyond the Journey's End",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/1-34%20Beyond%20the%20Journey%27s%20End.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Zoltraak",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-01%20Zoltraak.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Across the Northern Lands",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-03%20Across%20the%20Northern%20Lands.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Gone, But Not Forgotten",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-04%20Gone%2C%20But%20Not%20Forgotten.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Deep in the Dungeon",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-06%20Deep%20in%20the%20Dungeon.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "A Sunrise Worth Seeing",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-10%20A%20Sunrise%20Worth%20Seeing.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "New Friends and Old Faces",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-11%20New%20Friends%20and%20Old%20Faces.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Sneaking and Shopping",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-12%20Sneaking%20and%20Shopping.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Stark the Pure",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-14%20Stark%20the%20Pure.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Odd Clouds",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-15%20Odd%20Clouds.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Seeds of the Past Bear Today's Fruit",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-21%20Seeds%20of%20the%20Past%20Bear%20Today%27s%20Fruit.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Headpats and Praise",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-22%20Headpats%20and%20Praise.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Pudding With Friends",
        artist: "Evan Call",
        url: "https://dn710102.ca.archive.org/0/items/frieren-beyond-journeys-end-ost/2-24%20Pudding%20With%20Friends.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Fern's Birthday",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-25%20Fern%27s%20Birthday.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Privilege of the Young",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-26%20Privilege%20of%20the%20Young.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Super Secret Magic Potions",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-27%20Super%20Secret%20Magic%20Potions.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Handsome Pose Collection",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-28%20Handsome%20Pose%20Collection.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Too Many Grimories",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-29%20Too%20Many%20Grimories.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Stories Yet Untold",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-30%20Stories%20Yet%20Untold.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Old Man Voll",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-31%20Old%20Man%20Voll.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Waltz For Stark and Fern",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-34%20Waltz%20For%20Stark%20and%20Fern.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Mirrored Lotus",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-35%20Mirrored%20Lotus.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Song For the Beyond",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-beyond-journeys-end-ost/2-36%20Song%20For%20the%20Beyond.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "The Journey Continues",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/01.%20The%20Journey%20Continues.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Ripples in a River of Time",
        artist: "Evan Call",
        url: "https://ia600703.us.archive.org/20/items/frieren-season-2-ost/02.%20Ripples%20in%20a%20River%20of%20Time.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "The Winding Road",
        artist: "Evan Call",
        url: "https://ia800703.us.archive.org/20/items/frieren-season-2-ost/03.%20The%20Winding%20Road.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Villages and Vagabonds",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/04.%20Villages%20and%20Vagabonds.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Walk the Good Path",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/05.%20Walk%20the%20Good%20Path.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Reflections",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/06.%20Reflections.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Memories - Wayfarers of Time",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/07.%20Memories%20-%20Wayfarers%20of%20Time.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Ready Your Weapon",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/08.%20Ready%20Your%20Weapon.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Castles and Cobblestone",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/09.%20Castles%20and%20Cobblestone.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Tune for a Traveller",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/10.%20Tune%20for%20a%20Traveller.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Happiness for Fern",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/11.%20Happiness%20for%20Fern.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Spells and Spoils",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/12.%20Spells%20and%20Spoils.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "An Afternoon Date",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/13.%20An%20Afternoon%20Date.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Kind-Hearted Warrior",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/14.%20Kind-Hearted%20Warrior.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Heart of a Hero",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/15.%20Heart%20of%20a%20Hero.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Hero of the South",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/16.%20Hero%20of%20the%20South.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "From One Hero to Another",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/17.%20From%20One%20Hero%20to%20Another.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Four Swords of Despair",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/19.%20Four%20Swords%20of%20Despair.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Divine Revolte",
        artist: "Evan Call",
        url: "https://archive.org/download/frieren-season-2-ost/20.%20Divine%20Revolte.mp3",
        cover: "https://ia802806.us.archive.org/4/items/frieren-beyond-journeys-end-ost/cover.jpg"
    },
    {
        name: "Your Turn to Go",
        artist: "Nankidai",
        url: "https://static.wikia.nocookie.net/kimi-ga-shine/images/5/5d/Famicon_%28Your_Turn_to_Go%29.ogg",
        cover: "https://static.wikia.nocookie.net/kimi-ga-shine/images/8/82/OST_1_cover.jpg"
    },
    {
        name: "Kind Moment",
        artist: "Nankidai",
        url: "https://static.wikia.nocookie.net/kimi-ga-shine/images/e/ea/Naki_%28Kind_Moment%29.ogg",
        cover: "https://static.wikia.nocookie.net/kimi-ga-shine/images/8/82/OST_1_cover.jpg"
    },
    {
        name: "Clown's Song",
        artist: "Nankidai",
        url: "https://static.wikia.nocookie.net/kimi-ga-shine/images/a/af/Piero_%28Clown%27s_Song%29.ogg",
        cover: "https://static.wikia.nocookie.net/kimi-ga-shine/images/8/82/OST_1_cover.jpg"
    },
    {
        name: "All Move Forward",
        artist: "Nankidai",
        url: "https://static.wikia.nocookie.net/kimi-ga-shine/images/d/dd/Susume_%28All_Move_Froward%29.ogg",
        cover: "https://static.wikia.nocookie.net/kimi-ga-shine/images/8/82/OST_1_cover.jpg"
    },
    {
        name: "Requiem",
        artist: "Nankidai",
        url: "https://static.wikia.nocookie.net/kimi-ga-shine/images/b/b5/Ithukusimu_%28Ithukusimu%29.ogg",
        cover: "https://static.wikia.nocookie.net/kimi-ga-shine/images/8/82/OST_1_cover.jpg"
    },
    {
        name :"Enter Hallownest",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/01%20-%20Enter%20Hallownest.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Dirtmouth",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/02%20-%20Dirtmouth.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Crossroads",
        artist: "Christopher Larkin",
        url: "archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/03%20-%20Crossroads.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Greenpath",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/05%20-%20Greenpath.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Hornet",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/06%20-%20Hornet.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Reflection",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/07%20-%20Reflection.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"City of Tears",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/09%20-%20City%20of%20Tears.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Fungal Wastes",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/12%20-%20Fungal%20Wastes.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Resting Grounds",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/15%20-%20Resting%20Grounds.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Queen's Gardens",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/16%20-%20Queen%27s%20Gardens.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"The White Lady",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/17%20-%20The%20White%20Lady.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name :"Hollow Knight",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/official-hollow-knight-original-soundtrack/Hollow%20Knight%20-%20Official%20Soundtrack/26%20-%20Hollow%20Knight.mp3",
        cover: "https://dn710202.ca.archive.org/0/items/official-hollow-knight-original-soundtrack/__ia_thumb.jpg"
    },
    {
        name: "Moss Grotto",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/02%20-%20Moss%20Grotto.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Repose",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/07%20-%20Repose.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Bellhart",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/14%20-%20Bellhart.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Shellwood",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/16%20-%20Shellwood.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Hunter's Trail",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/18%20-%20Hunter%27s%20Trail.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Bilewater",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/21%20-%20Bilewater.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Choral Chambers",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/30%20-%20Choral%20Chambers.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Songclave",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/31%20-%20Songclave.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Cogwork Core",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/33%20-%20Cogwork%20Core.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Whispering Vaults",
        artist: "Christopher Larkin",
        url: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/34%20-%20Whispering%20Vaults.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "High Halls",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/36%20-%20High%20Halls.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Lost Verdania",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/45%20-%20Lost%20Verdania.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Last Dive",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/50%20-%20Last%20Dive.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Sister of the Void",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/52%20-%20Sister%20of%20the%20Void.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Silksong",
        artist: "Christopher Larkin",
        url: "https://archive.org/download/hollow-knight-silksong-ost/53%20-%20Silksong.mp3",
        cover: "https://dn721803.ca.archive.org/0/items/hollow-knight-silksong-ost/cover.jpg"
    },
    {
        name: "Megurin Luka Code Answer - D'elf",
        artist: "KEIZO",
        url: "https://nu.vgmtreasurechest.com/soundtracks/astlibra-revision-switch-windows-gamerip-2022/hrnnbtqw/110.%20Megurin%20Luka%20Code%20Answer%20-%20D%27elf%20%28Full%29.mp3",
        cover: "https://nu.vgmtreasurechest.com/soundtracks/astlibra-revision-switch-windows-gamerip-2022/AlbumArt.png"
    },
    {
        name: "Ambient 9",
        artist: "iridtv",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/olfvksbjde/01.%20Ambient%209.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "Clouds",
        artist: "Kirk Osamayo",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/fnyemlvfba/02.%20Clouds.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "Let's Have A Good Day",
        artist: "Kirk Osamayo",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/ylabpqezzs/03.%20Let%27s%20Have%20A%20Good%20Day.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "A New Path",
        artist: "Kirk Osamayo",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/pkyikxulmg/08.%20A%20New%20Path.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "Above The Mountains",
        artist: "Kirk Osamayo",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/czmyhedndm/31.%20Above%20The%20Mountains.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "Comfort",
        artist: "Abstraction",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/mhbdtnsziw/11.%20Comfort.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "Slow Snow",
        artist: "Abstraction",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/ihuhevxuml/16.%20Slow%20Snow.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "Menu",
        artist: "Abstraction",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/urfxzoetum/32.%20Menu.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "Lullaby",
        artist: "Mezzosound",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/gjqilvqpui/13.%20Lullaby.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "Out of Love (Instrumental Version)",
        artist: "SCENE feat. IFCHAN",
        url: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/ershulanim/33.%20Out%20of%20Love%20%28Instrumental%20Version%29.mp3",
        cover: "https://jetta.vgmtreasurechest.com/soundtracks/zato-i-love-the-world-and-everything-in-it-2025/Cover.png"
    },
    {
        name: "The Sunken City",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/mapwqmnd/01.%20The%20Sunken%20City.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "Tranquil Moments",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/xyzconwu/03.%20Tranquil%20Moments.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "Vertigo",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/hdtlwamk/04.%20Vertigo.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "The Face I See When I Close My Eyes",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/qwlrxqlh/05.%20The%20Face%20I%20See%20When%20I%20Close%20My%20Eyes.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "Good Morning, Sunshine",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/yubwegtc/07.%20Good%20Morning%2C%20Sunshine.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "Walking In The Twilight",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/hitwbrfz/09.%20Walking%20In%20The%20Twilight.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "Working",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/jpvmvsdo/11.%20Working.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "The Children Play",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/bimifcxe/14.%20The%20Children%20Play.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "A Lull In The Sea",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/gqlkorpb/15.%20A%20Lull%20In%20The%20Sea.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "When I See The Sparkle Of Your Tears",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/ibjpzadq/19.%20When%20I%20See%20The%20Sparkle%20Of%20Your%20Tears.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "Days Of Love",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/tutlwapv/20.%20Days%20Of%20Love.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "Light Across the Seas",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/ifcxdykc/21.%20Light%20Across%20the%20Seas.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "Dear Moments",
        artist: "Fuminori Matsumoto",
        url: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/qgjchgjz/24.%20Dear%20Moments.mp3",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: "",
        artist: "Fuminori Matsumoto",
        url: "",
        cover: "https://lambda.vgmtreasurechest.com/soundtracks/atri-my-dear-moments-original-soundtrack-2020/00%20Front.jpg"
    },
    {
        name: ""
    }
];

document$.subscribe(() => {
    if (!MUSIC_TRACKS.length || document.getElementById("music-player-toggle")) return;

    if (typeof APlayer !== "function") {
        console.error("Music player initialization failed: APlayer is unavailable.");
        return;
    }

    createMusicUI();
});

function createMusicUI() {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.id = "music-player-toggle";
    toggleBtn.title = "Music Player";
    toggleBtn.innerHTML = MUSIC_ICON;
    document.body.appendChild(toggleBtn);

    const playerContainer = document.createElement("div");
    playerContainer.id = "music-player-container";
    document.body.appendChild(playerContainer);

    const player = new APlayer({
        container: playerContainer,
        fixed: false,
        mini: false,
        autoplay: false,
        listFolded: true,
        theme: "#2980b9",
        volume: 0.5,
        preload: "none",
        audio: MUSIC_TRACKS,
    });
    player.options.fixed = true;

    toggleBtn.addEventListener("click", () => {
        playerContainer.classList.toggle("show");
        toggleBtn.classList.toggle("active");
    });
}
