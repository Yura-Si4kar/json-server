export default class Weather {
    static loading_animation = `<div class="weather__loading">
        <img src="./img/loading.gif" alt="Loading...">
    </div>`;

    static weather_template = `<div class="weather">
        <div class="weather__header">
            <div class="weather__main">
                <div class="weather__city">{{location}}</div>
                <div class="weather__icon">
                    <img src="http://openweathermap.org/img/w/{{weatherIcon}}.png" alt="Clouds" width="80" height="80">
                </div>
            </div>
            <div class="weather__status">{{weatherStatus}}</div>
            <div class="weather__temp">{{temp}}</div>
            <div class="weather__feels-like">Feals like: {{feelsLike}}</div>
            <button>More info</button>
        </div>
        <div class='weather-details'>
            <div class="weather__status">Humidity: {{humidity}}%</div>
            <div class="weather__status">Sunrise: {{sunRise}} AM</div>
            <div class="weather__status">Sunset: {{sunSet}} PM</div>
            <div class="weather__status">Wind: {{wind}} m/s PM</div>
            <div class="weather__status">Gust: {{gust}} m/s PM</div>
            <div class="weather__status">Pressure: {{pressure}}%</div>
        </div>
    </div>`

    static createWidget(data) {
        return Weather.weather_template
            .replace('{{location}}', data.name)
            .replace('{{weatherIcon}}', data.weather[0].icon)
            .replace('{{weatherStatus}}', data.weather[0].main)
            .replace('{{temp}}', Math.round(data.main.temp))
            .replace('{{feelsLike}}', Math.round(data.main.feels_like))
            .replace('{{humidity}}', data.main.humidity)
            .replace('{{sunRise}}', this._getTime(data.sys.sunrise))
            .replace('{{sunSet}}', this._getTime(data.sys.sunset))
            .replace('{{wind}}', data.wind.speed)
            .replace('{{gust}}', data.wind.gust)
            .replace('{{pressure}}', data.main.pressure)
    }

    constructor(config = {}) {
        this.el = Weather.weather_template;
        this.animation = Weather.loading_animation;
    }

    renderWidget(data) {
        console.log(data);
    }

    _getTime(source) {
        let h = Math.floor(source / 1000 / 60 / 60) % 24;
        let m = Math.floor(source / 1000 / 60) % 60;
        let s = Math.floor(source / 1000) % 60;
        
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        return `${h}:${m}:${s}`;
    }
}