window.SLIDES = [
  { "kind": "cover",
    "title": "In Defense of Disintegration",
    "subtitle": "a critique of technologically-imposed coherence in artificial intelligence and other compression-based software infrastructures",
    "byline": "Grayson Earle" },

  { "kind": "side",
    "src": ["media/noise.png", "media/mountain_original.png"] },

  { "kind": "text",
    "title": "On William Basinski: The Disintegration Loops (2002)",
    "prose": true,
    "playAudio": true,
    "body": [
      "The Disintegration Loops is a 2002-2003 four-album series by composer William Basinski: ambient, drone, and tape music made from old Muzak recordings on magnetic tape that physically degraded as he played and recorded them.",
      "The tape's decay isn't a loss of data; it's a rupture. It reveals the fragile seam between an ordered system and the chaotic potential of the infinite volume beneath the surface."
    ] },

  { "kind": "text",
    "title": "The Smiley and the Emoji",
    "prose": true,
    "body": [
      "The text-based smiley : ) was a disobedient hack, a repurposing of punctuation against its intended use. The emoji is its replacement: a coherent, consortium-controlled asset, each character standardized, licensed, and managed. 👮‍♂️ 👎"
    ] },

  { "kind": "quote",
    "title": "The Dictatorship of the Past",
    "quote": "A logical limit of machine learning classification...is the inability to recognise a unique anomaly that appears for the first time...As a technique of information compression, machine learning automates the dictatorship of the past, of past taxonomies and behavioural patterns, over the present. This problem can be termed the regeneration of the old: the application of a homogenous space-time view that restrains the possibility of a new historical event.",
    "attribution": "Matteo Pasquinelli & Vladan Joler: The Nooscope Manifested (2020)" },

  { "kind": "quote",
    "title": "On Exactitude in Science",
    "quote": "...In that Empire, the Art of Cartography attained such Perfection that the map of a single Province occupied the entirety of a City, and the map of the Empire, the entirety of a Province. In time, those Unconscionable Maps no longer satisfied, and the Cartographers Guilds struck a Map of the Empire whose size was that of the Empire, and which coincided point for point with it. The following Generations, who were not so fond of the Study of Cartography as their Forebears had been, saw that that vast Map was Useless, and not without some Pitilessness was it, that they delivered it up to the Inclemencies of Sun and Winters. In the Deserts of the West, still today, there are Tattered Ruins of that Map, inhabited by Animals and Beggars; in all the Land there is no other Relic of the Disciplines of Geography.",
    "attribution": "Jorge Luis Borges, Collected Fictions, translated by Andrew Hurley" },

  { "kind": "quote",
    "quote": "cartographic silences ... positive statements of what is not intended to be there",
    "attribution": "J.B. Harley: Deconstructing the Map (1989)" },

  { "kind": "text",
    "title": "Spaces of Representation",
    "prose": true,
    "body": [
      "The cartographic operation does not describe a territory that already exists; it constitutes the territory as a knowable and administrable reality. Rather than merely compressing an antecedent reality, the model dictates what qualifies as representable."
    ] },

  { "kind": "quote",
    "title": "The Map is the Territory",
    "quoteHtml": "Second, maps are not just representations but also instruments. They are based on mathematical operations and they constitute a substantial part of a cultural practice. A main feature of the analysis of maps as cultural technologies is that it considers maps <em class=\"hl\">not as representations of space but as spaces of representation</em>. The historicity that is of interest, in the first place, in connection with those spatial representations is not the historicity of the represented spaces. Instead it is the historicity of the space of representation itself.",
    "attribution": "Bernhard Siegert: The Map is the Territory (2011)" },

  { "kind": "image", "src": "media/alphafold4.gif",
    "caption": "Not All AI Is the Same (A timelapse of AlphaFold creating increasingly optimal protein folding strategies)" },

  { "kind": "image", "src": "media/mountain_original.png",
    "caption": "Stable Diffusion v1.5 image output for the prompt \"A high-resolution professional photograph of a majestic mountain range at sunrise, cinematic lighting, 8k\"" },

  { "kind": "image", "src": "media/noise.png",
    "caption": "The starting point for a diffusion model, noise passed through a VAE." },

  { "kind": "list",
    "title": "CLIP and the U-Net",
    "items": [
      { "term": "CLIP", "body": "converts the text prompt into a vector, anchoring what the image should depict" },
      { "term": "U-Net", "body": "the denoising engine; predicts and removes noise step by step, steered by CLIP's anchor, until a coherent image emerges in latent space" }
    ] },

  { "kind": "code",
    "title": "The Intervention",
    "filename": "degrade_all_tensors.py",
    "code": "def degrade_all_tensors(module, ratio, max_percent):\n    for name, param in module.named_parameters():\n        with torch.no_grad():\n            p_range = param.data.max() - param.data.min()\n            if p_range <= 1e-12: continue\n            mask = (torch.rand(param.shape) < ratio)\n            delta = max_percent * p_range\n            shifts = torch.empty(param.shape).uniform_(-delta, delta)\n            param.data[mask] += shifts[mask]\n\nfor i in range(num_steps):\n    degrade_all_tensors(pipe.unet, ratio=0.01, max_percent=0.05)\n    image = pipe(prompt).images[0]\n    image.save(f\"step_{i:04d}.jpg\")" },

  { "kind": "image", "src": "media/mountain_original.png",
    "caption": "Stable Diffusion v1.5 image output for the prompt \"A high-resolution professional photograph of a majestic mountain range at sunrise, cinematic lighting, 8k\"" },

  { "kind": "image", "src": "media/step_8.png",
    "caption": "Image generated after 8 disintegration steps." },

  { "kind": "image", "src": "media/step_10.png",
    "caption": "Image generated after 10 disintegration steps." },

  { "kind": "text",
    "title": "Phenomenology of the Rupture",
    "prose": true,
    "body": [
      "Generated Images do not produce thought. Seeing the statistical average of a mountain is fundamentally not thought-provoking, in the literal sense. Encountering something non-normative or abstract prompts the viewer to think. What am I looking at? This question is already answered with generated imagery."
    ] },

  { "kind": "image", "src": "media/step_18.png",
    "caption": "Image generated after 18 disintegration steps." },

  { "kind": "image", "src": "media/step_19.png",
    "caption": "Image generated after 19 disintegration steps." },

  { "kind": "image", "src": "media/step_20.png",
    "caption": "Image generated after 20 disintegration steps." },

  { "kind": "quote",
    "title": "Plasticity as Disobedience",
    "quote": "The word plasticity thus unfolds its meaning between sculptural molding and deflagration, which is to say explosion. From this perspective, to talk about the plasticity of the brain means to see in it not only the creator and receiver of form but also an agency of disobedience to every constituted form, a refusal to submit to a model.",
    "attribution": "Catherine Malabou: What Should We Do with Our Brain? (2008)" },

  { "kind": "links",
    "title": "be in touch",
    "items": [
      { "label": "www.graysonearle.com", "url": "https://www.graysonearle.com" },
      { "label": "studio@graysonearle.com", "url": "mailto:studio@graysonearle.com" },
      { "label": "@prismspecs", "url": "https://instagram.com/prismspecs" }
    ] }
];
