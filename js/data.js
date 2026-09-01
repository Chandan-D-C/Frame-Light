/**
 * FRAME & LIGHT — centralized photography dataset
 * Curated real photography (Unsplash, free license) selected for a single
 * cohesive visual identity: cinematic, atmospheric, editorial.
 * Replace `image` / `thumbnail` URLs with your own photography when ready —
 * everything downstream (featured track, masonry, filters, lightbox,
 * stories) reads from this file alone.
 */

const U = (id, w, h) => `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`;

const PHOTO_DATA = [
  {
    id: "silent-geometry",
    title: "Silent Geometry",
    category: "architecture",
    location: "Unknown City",
    coords: "12°58'17\"N 77°35'37\"E",
    camera: "Panasonic DC-G9",
    lens: "24mm",
    aperture: "f/8",
    shutter: "1/500",
    iso: "100",
    description: "Sunlight cutting a modern façade into pure geometry — the kind of shadow that only exists for a few minutes a day, and only if you're standing in the right place when it happens.",
    image: U("photo-1761600577035-c9cb717c7059", 1600, 2000),
    thumbnail: U("photo-1761600577035-c9cb717c7059", 700, 900),
    orientation: "portrait"
  },
  {
    id: "after-the-rain",
    title: "After the Rain",
    category: "street",
    location: "Tokyo, Japan",
    coords: "35°41'22\"N 139°41'30\"E",
    camera: "Sony ILCE-7C",
    lens: "35mm",
    aperture: "f/2.8",
    shutter: "1/125",
    iso: "800",
    description: "The street empties out first, then the reflections arrive. What's left behind is a second city, upside down, waiting to be walked through.",
    image: U("photo-1752486345389-ed3b299f34af", 2000, 1333),
    thumbnail: U("photo-1752486345389-ed3b299f34af", 900, 600),
    orientation: "landscape"
  },
  {
    id: "between-shadows",
    title: "Between Shadows",
    category: "portrait",
    location: "Istanbul, Türkiye",
    coords: "41°00'49\"N 28°58'34\"E",
    camera: "—",
    lens: "85mm",
    aperture: "f/1.8",
    shutter: "1/400",
    iso: "200",
    description: "A silhouette caught against the last hard light of the day — the kind of rim light that turns a person into pure outline for about ninety seconds.",
    image: U("photo-1774016591221-d3e8e7ebdd16", 1600, 2000),
    thumbnail: U("photo-1774016591221-d3e8e7ebdd16", 700, 900),
    orientation: "portrait"
  },
  {
    id: "green-in-the-grey",
    title: "Green in the Grey",
    category: "nature",
    location: "Trillemarka, Norway",
    coords: "59°55'11\"N 9°01'48\"E",
    camera: "Sony ILCE-7RM3",
    lens: "50mm",
    aperture: "f/5.6",
    shutter: "1/250",
    iso: "160",
    description: "Mixed pine and broadleaf, layered by fog until the trees stop being individual trees and start being a single flat pattern of dark and grey.",
    image: U("photo-1765833218137-abffe38f9e1a", 1400, 1750),
    thumbnail: U("photo-1765833218137-abffe38f9e1a", 650, 820),
    orientation: "portrait"
  },
  {
    id: "concrete-dreams",
    title: "Concrete Dreams",
    category: "architecture",
    location: "Shanghai, China",
    coords: "31°15'19\"N 121°28'06\"E",
    camera: "Nikon Z8",
    lens: "24mm",
    aperture: "f/8",
    shutter: "1/200",
    iso: "100",
    description: "Brutalism gets called cold, but at golden hour every one of its hard edges turns warm — a stairwell and a corridor that were built for function, photographed for feeling.",
    image: U("photo-1741524915638-9f584edd256c", 2000, 1333),
    thumbnail: U("photo-1741524915638-9f584edd256c", 900, 600),
    orientation: "landscape"
  },
  {
    id: "the-last-light",
    title: "The Last Light",
    category: "abstract",
    location: "Monte Bregagno, Italy",
    coords: "46°05'12\"N 9°17'24\"E",
    camera: "Sony ILCE-7",
    lens: "70mm",
    aperture: "f/11",
    shutter: "1/60",
    iso: "100",
    description: "The sun didn't set so much as slide sideways along the ridgeline, staying just long enough to turn every fold in the mountain a different shade of gold.",
    image: U("photo-1464061884326-64f6ebd57f83", 2000, 1125),
    thumbnail: U("photo-1464061884326-64f6ebd57f83", 900, 506),
    orientation: "landscape"
  },
  {
    id: "urban-reflections",
    title: "Urban Reflections",
    category: "street",
    location: "Tokyo, Japan",
    coords: "35°41'22\"N 139°41'30\"E",
    camera: "Ricoh GR IIIx",
    lens: "18mm",
    aperture: "f/5.6",
    shutter: "1/320",
    iso: "400",
    description: "Same night, a few streets over — car lights doubling themselves in a wet road, a city that photographs itself constantly whether anyone's watching or not.",
    image: U("photo-1756738767692-be676b941656", 1600, 2000),
    thumbnail: U("photo-1756738767692-be676b941656", 700, 900),
    orientation: "portrait"
  },
  {
    id: "a-moment-between",
    title: "A Moment Between",
    category: "portrait",
    location: "Istanbul, Türkiye",
    coords: "41°00'49\"N 28°58'34\"E",
    camera: "—",
    lens: "85mm",
    aperture: "f/2",
    shutter: "1/320",
    iso: "200",
    description: "A second frame from the same roll, seconds apart — the light hadn't moved yet, but the pose had. Two moments from one held breath.",
    image: U("photo-1774016591221-d3e8e7ebdd16", 1400, 1750),
    thumbnail: U("photo-1774016591221-d3e8e7ebdd16", 650, 820),
    orientation: "portrait"
  },
  {
    id: "where-light-falls",
    title: "Where Light Falls",
    category: "minimal",
    location: "Abu Dhabi, UAE",
    coords: "24°27'12\"N 54°23'52\"E",
    camera: "Sony ILCE-7M4",
    lens: "35mm",
    aperture: "f/9",
    shutter: "1/250",
    iso: "100",
    description: "A whitewashed geometry against water and sky — the kind of clean, considered architecture that photographs itself if you just wait for the light to arrive.",
    image: U("photo-1783685158043-c18472c7f16e", 2000, 1500),
    thumbnail: U("photo-1783685158043-c18472c7f16e", 900, 675),
    orientation: "landscape"
  },
  {
    id: "golden-silence",
    title: "Golden Silence",
    category: "nature",
    location: "Erg Chigaga, Morocco",
    coords: "30°01'26\"N 5°30'58\"W",
    camera: "Canon EOS R7",
    lens: "70mm",
    aperture: "f/8",
    shutter: "1/500",
    iso: "100",
    description: "Dunes hold the last light longer than anything else in the frame. Everything else goes dark first, and the sand keeps glowing for another few minutes on its own.",
    image: U("photo-1763146741417-de8b6ae742b2", 2000, 1333),
    thumbnail: U("photo-1763146741417-de8b6ae742b2", 900, 600),
    orientation: "landscape"
  }
];

const STORY_DATA = [
  {
    number: "01",
    title: "When Rain Turns a City Into a Painting",
    location: "Tokyo, Japan",
    text: "There's a ten-minute window after a downpour when the city stops being architecture and starts being color. Every surface turns into a mirror that doesn't hold still. This is the story of chasing that window through two different streets, one night, until the light finally cooperated.",
    photoId: "after-the-rain",
    layout: "image-left"
  },
  {
    number: "02",
    title: "Between Shadows",
    location: "Istanbul, Türkiye",
    text: "The last hard light of the day lasts about ninety seconds before it's gone. This portrait happened somewhere in that window, backlit hard enough that the subject became pure outline — and the frame right after it, a heartbeat later, became something else entirely.",
    photoId: "between-shadows",
    layout: "image-right"
  },
  {
    number: "03",
    title: "The Last Light",
    location: "Monte Bregagno, Italy",
    text: "Ridge light doesn't announce itself — it just starts happening, one fold of the mountain at a time, and you have maybe ten minutes before it's gone for the day. This frame was somewhere in the middle of that window.",
    photoId: "the-last-light",
    layout: "full-width"
  }
];
