import { useEffect, useState } from 'react';
import {getTemperatureFromApi} from "./api";

const data = [
  {
    id: '1',
    name: 'Pilsner',
    minimumTemperature: 4,
    maximumTemperature: 6,
  },
  {
    id: '2',
    name: 'IPA',
    minimumTemperature: 5,
    maximumTemperature: 6,
  },
  {
    id: '3',
    name: 'Lager',
    minimumTemperature: 4,
    maximumTemperature: 7,
  },
  {
    id: '4',
    name: 'Stout',
    minimumTemperature: 6,
    maximumTemperature: 8,
  },
  {
    id: '5',
    name: 'Wheat beer',
    minimumTemperature: 3,
    maximumTemperature: 5,
  },
  {
    id: '6',
    name: 'Pale Ale',
    minimumTemperature: 4,
    maximumTemperature: 6,
  },
];

const BeerList = () => {
    const [items, setItems] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const request = () =>
          data.forEach((product) => {
            getTemperatureFromApi(product.id)
            .then((response) =>
                setItems((prevItems) => ({
                  ...prevItems,
                  [product.id]: {
                    ...product,
                    ...response,
                  },
                }))
              ).catch((e) => setError(true));
          });
    
        setInterval(request, 5000);
    
        request();
      }, []);
    
      return error ? (<div>
      <h2>Unable to read temperature from API</h2>
      </div>)
      : (
        <div>
          <h2>Beers</h2>
          <table>
            <thead>
              <tr>
                <th align="left">Product</th>
                <th align="left">Temperature</th>
                <th align="left">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(items).map((itemKey) => (
                <tr key={items[itemKey].id}>
                  <td width={150}>{items[itemKey].name}</td>
                  <td width={150}>{items[itemKey].temperature}</td>
                  <td width={150}>
                    {items[itemKey].temperature <
                      items[itemKey].minimumTemperature && <span style={{  'background-color': '#f5c75b', padding: '0 5px'  }}>too low</span>}
                    {items[itemKey].temperature >
                      items[itemKey].maximumTemperature && <span  style={{ 'background-color': '#f26363', padding: '0 5px' }}>too high</span>}
                    {items[itemKey].temperature <=
                      items[itemKey].maximumTemperature &&
                      items[itemKey].temperature >=
                        items[itemKey].minimumTemperature && <span style={{ 'background-color': '#7ef288', padding: '0 5px' }}>all good</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default BeerList;