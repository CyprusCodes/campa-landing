function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const weightColor = d3
  .scaleSequentialSqrt(d3.interpolateYlOrRd)
  .domain([0, 1e7]);

const world = Globe()(document.getElementById("globe"))
  .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
  .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
  .backgroundImageUrl("https://unpkg.com/three-globe/example/img/night-sky.png")
  .hexBinPointWeight("pop")
  .hexAltitude((d) => d.sumWeight * 6e-8)
  .hexBinResolution(4)
  .hexTopColor((d) => weightColor(d.sumWeight))
  .hexSideColor((d) => weightColor(d.sumWeight))
  .hexBinMerge(true)
  .enablePointerInteraction(false); // performance improvement

let mockData = [];
for (let i = 0; i < 200; i++) {
  const randomLatitude = getRandomInt(-90, 90);
  const randomLongitude = getRandomInt(-180, 180);
  const randomPop = getRandomInt(1000000, 350000000);

  mockData.push({
    lat: +randomLatitude,
    lng: +randomLongitude,
    pop: +randomPop,
  });
}
// world.hexBinPointsData(mockData);

// Add auto-rotation
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.6;
