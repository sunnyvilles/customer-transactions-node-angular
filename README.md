# customer-transactions-node-angular

The application showcases a list of transactions in a timeline, categorized by date and ordered by time .  more Information about a transaction can be found by clicking its corresponding entry in timeline.

Following env used for development

    node v18.15.0
    npm v9.5.0
    macos Montery 12.5.1
    Vscode
    
used: angular, angular-material , scss and flex ,rxjs

## Steps

move to Frontend folder and run following commands

### Install dependencies
```sh
npm install
```

### Development server
```sh
ng serve
```
### Build

Run below command to build the project. The build artifacts will be stored in the `dist/` directory.
```sh
ng build
```

### Running unit tests
```sh
ng test
```
### Lint with EsLint

```sh
ng lint
```

## assumptions:
- server port is : 8080

### The good

1. no bootstrap only scss and flex for responsive behaviour
2. notifications for data loading , errors
3. separate components based approach
4. Architecture allows other features to be added in future

### improvements/ TODO
1. Type safe Node Backend service
2. Create dev and prod env
3. More test cases
4. styling

### issues faced

1. cors
2. content security policy
3. Map sorting

