# IxDA La Plata Roullete - Multiuse

This small and of dubious quality application was created to make draws in the ISA17 Redux in La Plata by the IxdaLaPlata team.

This app use CSV file with assistants exported from *Eventbrite* (use the API will be adden in the new version)

## Third party codes
- [PapaParse] to parse the CSV without problems
- Using code of [Canvas-Roullete] to draw the custom roullete

## Screen Shots
![Screenshot roulette spinning](https://raw.githubusercontent.com/IxDALaPlata/redux-rulette/master/screenshots/Roulette.png)

![Screenshot roulette winner](https://raw.githubusercontent.com/IxDALaPlata/redux-rulette/master/screenshots/Winner.png)


### How run (if you aren't dev)

- Download latest version release (link)

- Download or create a CSV file with 'report.csv' name, save it inside public/csv folder 
- The CSV file need to have the followngs fields and order:
 - Name
 - Lastname
 - Email
 - Others

For example:

| Nombre  | Apellido | e-mail               |
|---------|----------|----------------------|
| Argento | Pepe     | argento...@gmail.com |


- Install some server app/extension. I recommend Web Server for Chrome [installer-here]
- Start extension, choose ixda-rullete folder. (here a video how to start and serve a folder [tutorial]

- If necesary you can change the background images. There are two images for diferent screen ratios. There in public/img folder. If you change it, with the same name, the background will chamge.

### How run (if you are dev)
```sh
$ npm install
$ npm start
```



### Development

Want to contribute? Great!
All Pull Request are welcome!

### Todos

 - Use Eventbrite Api
 - Make better code

### Working demo

https://redux-la-plata-sorteo.herokuapp.com/

License
----

MIT

**Free Software**

   [PapaParse]: <https://www.papaparse.com/>
   [Canvas-Roullete]: <https://github.com/shafdog/canvas-roulette>
   [installer-here]:<https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related>
[tutorial]:<https://www.youtube.com/watch?time_continue=49&v=AK6swHiPtew>