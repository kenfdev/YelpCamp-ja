maptilersdk.config.apiKey = maptilerApiKey;
maptilersdk.config.primaryLanguage = maptilersdk.Language.JAPANESE;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.BRIGHT,
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 }).setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
    )
    .addTo(map);
