const diseases = {
  liver: {
    Hepatomegaly: {
      Finding: [
        "The liver is enlarged.",
        "The liver is enlarged measuring # cm in craniocaudal diameter.",
        "Laki po ng atay niyo.",
        "The liver is {small/mid/large} o ye.",
      ],
      Impression: ["Hepatomegaly", "Enlarged liver"],
    },
    "Fatty Liver": {
      Finding: [
        "Diffuse parenchymal steatosis.",
        "Parenchyma is diffusely decreased.",
      ],
      Impression: ["Hepatic steatosis", "Fatty liver"],
    },
  },

  gallbladder: {
    Cholecystectomy: {
      Finding: [
        "Surgically absent.",
        "The liver is enlarged measuring # cm in craniocaudal diameter.",
        "Laki po ng atay niyo.",
        "The liver is {small/mid/large} o ye.",
      ],
      Impression: [],
    },
    "Gallstones / Cholelithiasis": {
      Finding: [
        "Diffuse parenchymal steatosis.",
        "Parenchyma is diffusely decreased.",
      ],
      Impression: ["Cholecystolithiasis", "Cholelithiasis"],
    },
  },

  "common bile duct": {
    Cholecystectomy: {
      Finding: [
        "Surgically absent.",
        "The liver is enlarged measuring # cm in craniocaudal diameter.",
        "Laki po ng atay niyo.",
        "The liver is {small/mid/large} o ye.",
      ],
      Impression: [],
    },
    "Fatty Liver": {
      Finding: [
        "Diffuse parenchymal steatosis.",
        "Parenchyma is diffusely decreased.",
      ],
      Impression: ["Hepatic steatosis", "Fatty liver"],
    },
  },

};

export default diseases;
