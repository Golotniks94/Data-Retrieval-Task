import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react'
let CanvasJSChart = CanvasJSReact.CanvasJSChart

let dataPoints = []
class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: 'Afghanistan',
    }
    this.setCountry = this.setCountry.bind(this)
  }

  setCountry(event) {
    this.setState({ country: event.target.value })
  }

  render() {
    const options = {
      theme: 'light2',
      title: {
        text: 'COVID 19 Cases',
      },
      axisY: {
        title: 'Cases',
        prefix: '',
      },
      data: [
        {
          type: 'line',
          xValueFormatString: 'DD MMM YYYY',
          yValueFormatString: '##',
          dataPoints: dataPoints,
        },
      ],
    }

    const countryList = [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antigua_and_Barbuda',
      'Argentina',
      'Armenia',
      'Aruba',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bermuda',
      'Bhutan',
      'Bolivia',
      'Bonaire, Sint Eustatius and Saba',
      'Bosnia_and_Herzegovina',
      'Botswana',
      'Bouvet Island',
      'Brazil',
      'British_Virgin_Islands',
      'Brunei_Darussalam',
      'Bulgaria',
      'Burkina_Faso',
      'Burundi',
      'Cambodia',
      'Cameroon',
      'Canada',
      'Cape_Verde',
      'Cases_on_an_international_conveyance_Japan',
      'Cayman_Islands',
      'Central_African_Republic',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Comoros',
      'Congo',
      'Costa_Rica',
      'Cote_dIvoire',
      'Croatia',
      'Cuba',
      'Curaçao',
      'Cyprus',
      'Czechia',
      'Democratic_Republic_of_the_Congo',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican_Republic',
      'Ecuador',
      'Egypt',
      'El_Salvador',
      'Equatorial_Guinea',
      'Eritrea',
      'Estonia',
      'Eswatini',
      'Ethiopia',
      'Falkland_Islands_(Malvinas)',
      'Faroe_Islands',
      'Fiji',
      'Finland',
      'France',
      'French_Polynesia',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Gibraltar',
      'Greece',
      'Greenland',
      'Grenada',
      'Guadeloupe',
      'Guam',
      'Guatemala',
      'Guernsey',
      'Guinea',
      'Guinea_Bissau',
      'Guyana',
      'Haiti',
      'Holy_See',
      'Honduras',
      'Hong Kong',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Isle_of_Man',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jersey',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'Kuwait',
      'Kyrgyzstan',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macao',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall_Islands',
      'Martinique',
      'Mauritania',
      'Mauritius',
      'Mayotte',
      'Mexico',
      'Micronesia',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Myanmar',
      'Namibia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'New_Caledonia',
      'New_Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palestine',
      'Panama',
      'Papua_New_Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Pitcairn',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'North_Macedonia',
      'Romania',
      'Russian_Federation ',
      'Saint_Lucia',
      'Saint_Vincent_and_the_Grenadines',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra_Leone',
      'Singapore',
      'Sint_Maarten',
      'Slovakia',
      'Slovenia',
      'Solomon Islands',
      'Somalia',
      'South_Africa',
      'Spain',
      'Sri_Lanka',
      'Sudan',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Thailand',
      'Timor_Leste',
      'Togo',
      'Tokelau',
      'Tonga',
      'Trinidad_and_Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Turks_and_Caicos_islands',
      'Uganda',
      'Ukraine',
      'United_Arab_Emirates',
      'United_Kingdom',
      'United_States_of_America',
      'Uruguay',
      'Uzbekistan',
      'Vanuatu',
      'Venezuela',
      'Vietnam',
      'Wallis_and_Futuna',
      'Western_Sahara',
      'Yemen',
      'Zambia',
      'Zimbabwe',
    ]

    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        <div>
          <select onChange={this.setCountry}>
            <option selected="selected">Select Country</option>
            {countryList.map((x, y) => (
              <option key={y}>{x}</option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    let chart = this.chart
    const country = this.state.country
    fetch('https://opendata.ecdc.europa.eu/covid19/casedistribution/json')
      .then((resp) => resp.json())
      .then((data) => data.records)
      .then(function (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].countriesAndTerritories === country) {
            let dateParts = data[i].dateRep.split('/')
            dataPoints.push({
              x: new Date(
                Number(dateParts[2]),
                Number(dateParts[1]),
                Number(dateParts[0])
              ),
              y: data[i].cases,
            })
          }
        }
        chart.render()
        dataPoints = []
      })
  }
}

export default Chart
