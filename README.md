# Personal
https://mehul-kothari.vercel.app/#about
https://github.com/mehulk05/Mehul.Kothari/blob/master/src/index.html
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## Firebase

Previamente debes tener instalado el paquete de firebase

```SH
npm install -g firebase-tools

firebase --version
```

Y logarte

```SH
firebase login
```
```SH
firebase init
```

Para más información [ver](https://www.youtube.com/watch?v=t_YSrxj0wGY)

- para añadir la librería de Firebase:

  ```SH
  ng add @angular/fire
  ```

  Se siguen los pasos (elegir el proyecto, etc)

- Se vuelve a lanzar

  ```SH
  firebase init
  ```

### Colecciones

#### page

![Page](./imgs/page.png?raw=true "page")

- modelo:

  ```TS
  export interface IPage{
    id?: string;
    about: string[];
    about_text: string;
    basic_information: {
      label: string;
      value: string;
    }[];
    footer: string;
    rrss: {
      icon: string;
      info: string;
      position: number;
      url: string;
      color: string;
    }[];
    title: string;
    work_experience: {
      company: string;
      info: string[];
      period: string;
      position: number;
    }[];
  }
  ```
#### skills

![Skills](./imgs/skills.png?raw=true "Skills")

- modelo:

  ```TS
  interface ISkill{
    id?: string;
    position: number;
    mode: string; // fe -> front-end, be -> back-end
    skill: string;
    name: string;
    base: number; // valor numérico que representa el % (1-5). Ejemplo: Angular representa un 4, entonces base es 4 * 20 = 80
  }
  ```
#### education

![Education](./imgs/education.png?raw=true "Education")

- modelo:

  ```TS
  export interface IEducation{
    id?: string;
    position: number;
    period: string;
    title: string;
    info: {
      location: string;
      title: string;
      data: string[];
    };
  }

  ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
