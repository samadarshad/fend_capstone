import { formatDistance, parse, parseISO, compareAsc, isValid } from 'date-fns'

export class HtmlBuilder {
    
    _get_departureDate = function (date, date_scheme) {
        if (!date)  {
            return ''
        }
        const date_standard = parse(date, date_scheme, new Date())
        if (!isValid(date_standard)) {
            return ''
        }
        const dateScheme = new Client.dateScheme()
        return `<span id="departure_date">${new Date(date_standard).toLocaleDateString(dateScheme.user_date_scheme_locale,  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>`
   }

   _get_departure = function (departure_city_name, departure_country_name, date, date_scheme) {
    const departureDateHtml = this._get_departureDate(date, date_scheme)   
    let departureHtml = ''
       if (departure_city_name || departureDateHtml) {
        departureHtml += `<p>Departing `
       } else {
           return ''
       }

       if (departure_city_name) {
        departureHtml += `from <span id="from_city_name">${departure_city_name}</span>`
        if (departure_country_name) {
            departureHtml += `, <span id="from_countryName"">${departure_country_name}</span>`
        }
        if (departureDateHtml) {
            departureHtml += `, `        
           }
       }
       
       if (departureDateHtml) {
            departureHtml += `on ${departureDateHtml}`        
       }

        departureHtml += `.</p>`

       
       return departureHtml
   }

   _get_carousel = function (pictures) {
        const pictureMessage = new Client.pictureMessageScheme()
        let carousel_inner_innerHTML = '';
        pictures.forEach(function(picture, i) {
            const pictureUrl = pictureMessage.get_url(picture)

            if (i == 0) {
                carousel_inner_innerHTML += 
                `
                    <div class="carousel-item active">
                        <img class="w-100" src="${pictureUrl}" alt="Slide ${i}">
                    </div>
                `
            } else {
                carousel_inner_innerHTML += 
                `
                    <div class="carousel-item">
                        <img class="w-100" src="${pictureUrl}" alt="Slide ${i}">
                    </div>
                `
            }

        })
        return carousel_inner_innerHTML
   }

   _get_weather_day_html(dayDate, dayTempC, dayWeatherIcon, dayWeatherDescription) {
        const dateScheme = new Client.dateScheme()
        const shortDate = new Date(dayDate).toLocaleDateString(dateScheme.user_date_scheme_locale,  { weekday: 'short' })
        const shortDateNum = new Date(dayDate).toLocaleDateString(dateScheme.user_date_scheme_locale,  {day: 'numeric' })

        const weatherIcon = Client.weatherIcons[`${dayWeatherIcon}.png`]

        return `
        <div class="weekly-weather-item">
            <p class="mb-0"> ${shortDate} </p> 
            <p class="mb-0"> ${shortDateNum} </p> 
            <img class="w-100" src="${weatherIcon}" alt="${dayWeatherDescription}" title="${dayWeatherDescription}">
            <p class="mb-0"> ${dayTempC}° </p>
        </div>
        `
   }

   _get_weather(weather, user_date) {
        const dateScheme = new Client.dateScheme()
        const user_date_standard = parse(user_date, dateScheme.user_date_scheme, new Date())
        const weatherMessage = new Client.weatherMessageScheme()

        let weekly_weather_innerHTML = '';
        for (const day of weather) {
            const dayDate = weatherMessage.get_date(day)

            let departureDateIsLater = 0
            if (user_date) {            
                const dayDateStandard = parse(dayDate, weatherMessage.get_weather_date_scheme, new Date())
                departureDateIsLater = compareAsc(dayDateStandard, user_date_standard)
            }        
            if (departureDateIsLater < 0) {
                // dont render weather
            } else {
                weekly_weather_innerHTML += this._get_weather_day_html(weatherMessage.get_date(day), weatherMessage.get_temp_celcius(day), weatherMessage.get_weatherIcon(day), weatherMessage.get_weatherDescription(day))
            }
        }
        let week_weather_forecast_innerHTML = '<h5>Weather forecast</h5>'
        if (!weekly_weather_innerHTML) {
            week_weather_forecast_innerHTML += `
            <div class="weather-card p-0">
                <p class="text-center font-italic" >No weather forecast available for given date.</p>
            </div> 
            `
        } else {
            week_weather_forecast_innerHTML += `
            <div class="weather-card p-0">
                <div class="d-flex weekly-weather">
                    ${weekly_weather_innerHTML}
                </div>
            </div>
            `
        }
        return week_weather_forecast_innerHTML
   }

   _createVoteDownHtml(id) {
    if (localStorage.getItem(id) != null && localStorage.getItem(id) == -1) {
        return `<button type="button" class="unstyled-button" onClick="Client.vote(1, ${id})"><i class="fa fa-angle-down greyed-out" aria-hidden="true"></i></button>`
    }
        return `<button type="button" class="unstyled-button" onClick="Client.vote(-1, ${id})"><i class="fa fa-angle-down" aria-hidden="true"></i></button>`
    }

    _createVoteUpHtml(id) {
        if (localStorage.getItem(id) != null && localStorage.getItem(id) == 1) {
            return `<button type="button" class="unstyled-button" onClick="Client.vote(-1, ${id})"><i class="fa fa-angle-up greyed-out" aria-hidden="true"></i></button>`
        }
    
        return `<button type="button" class="unstyled-button" onClick="Client.vote(1, ${id})"><i class="fa fa-angle-up" aria-hidden="true"></i></button>`
    }

    _create_saved_trip_card_subfields(travelling_from_city, travelling_from_countryName, departure_date, notes) {
        let subfields = ''
        if (travelling_from_city || travelling_from_countryName) {
            subfields += `<p class="card-text">From `
        }
        if (travelling_from_city) {
            subfields += `${travelling_from_city}`
            if (travelling_from_countryName) {
                subfields += `, ${travelling_from_countryName}`
            }
            subfields += `</p>`
        }

        if (departure_date) {
            subfields += `<p class="card-text">${departure_date}</p>`
        }
        if (notes) {
            subfields += `<p class="card-text">${notes}</p>`
        }
        return subfields
    }

    _create_saved_trip_card(id, data) {
        const vote_down_button_html = this._createVoteDownHtml(id)
        const vote_up_button_html = this._createVoteUpHtml(id)
        const subfields_html = this._create_saved_trip_card_subfields(data.travelling_from_city, data.travelling_from_countryName, data.date, data.notes)

        return `
        <div class="col-md-6 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-1 card-votes">
                            ${vote_up_button_html}
                            <br>
                            <span class="vote-number">${data.votes}</span>
                            <br>
                            ${vote_down_button_html}
                        </div>
                        <div class="col-9 card-text">
                            <h4 class="card-title">${data.city_name}, ${data.countryName}</h4>
                            ${subfields_html}
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" onClick="Client.viewTrip(${id})">View</button>
                            <button type="button" class="btn btn-sm btn-danger" onClick="Client.deleteTrip(${id})">Delete</button>
                        </div>
                        <small class="text-muted pl-2">Added ${formatDistance(parseISO(data.date_added), new Date())} ago</small>
                    </div>

                </div>
            </div>
        </div>
        `
    }

    createResults(city_name, countryName, weather, pictures, date, departure_city_name, departure_country_name) {
        const dateScheme = new Client.dateScheme()
        
        let carousel_inner_innerHTML = this._get_carousel(pictures);
        let week_weather_forecast_innerHTML = this._get_weather(weather, date);
        let departure_innerHTML = this._get_departure(departure_city_name, departure_country_name, date, dateScheme.user_date_scheme)
    
        return `
        <div class="card">
                        <div class="row">
                            <div class="col-lg-4">
                            <div id="countryCarousel" class="carousel slide" data-ride="carousel">
    
    
                                <div class="carousel-inner">
                                ${carousel_inner_innerHTML}
                                </div>
                                <a class="carousel-control-prev" href="#countryCarousel" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#countryCarousel" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                            <div class="card-text col-lg-8">
                                <h3><span id="city_name">${city_name}</span>, <span id="countryName">${countryName}</span></h3>
                                ${departure_innerHTML}
    
                                <div class="weather">
                                    ${week_weather_forecast_innerHTML}
                                </div>
                            </div>
    
                    <div class="card-body">
                        <div class="row">
                        
                        <div class="col-12 climate-flight-graph">
                            <h5 class="text-center">Monthly flight prices</h5>
                            <div id="flightprices"></div>
                        </div>
    
                        <form class="col-12 form-group" id="save-user">
                            <label for="user-input-notes">Notes</label>
                            <textarea class="form-control" id="user-input-notes" rows="3"></textarea>
                            <button type="submit" class="btn btn-sm btn-outline-secondary">Save (will be publicly visible)</button>
                        </form>
    
                    </div>
                    </div>
    
                </div>
        `
    }

    createSavedTrips(savedTrips) {
        
        let saved_trips_section = `
        <div class="container-fluid">
        <div class="row">
        `;    
        const savedTripsScheme = new Client.storeScheme()
        const orderedSavedTrips = savedTrips.sort(function(a, b) {        
            return savedTripsScheme.get_id(b) - savedTripsScheme.get_id(a);
        })
        for (const trip of orderedSavedTrips) {
            const id = savedTripsScheme.get_id(trip)
            const data = savedTripsScheme.get_data(trip)
            saved_trips_section += this._create_saved_trip_card(id, data)       
        }
    
        saved_trips_section += `
        </div> 
        </div> 
        `
    
        return saved_trips_section
    }

    createFlightPricesError () {
        return `<p class="text-center font-italic" >No flight data available for given locations.</p>`
    }
}; 
