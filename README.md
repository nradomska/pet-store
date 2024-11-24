# Pet Store

Aplikacja służąca do obsługi podstawowych funkcjonalności skelpu zoologicznego.
Pozwala na dodawanie, edytowanie, usuwanie oraz wyświetlanie zwierząt dostępnych w systemie.

## Uruchamianie

W celu uruchomienia aplikacji należy użyć komendy

```bash
ng serve
```

lub
```bash
npm run start
```

## Testy jednostkowe

W celu uruchomienia testów jednostkowych należy użyć komendy

```bash
npm run test
```

## Testy end-to-end

W celu uruchomienia testów end-to-end należy użyć komendy

```bash
npm run e2e
```

## Wykorzystane techonolgie
* Angular 19
* Angular CLI
* Angular material
* rxjs
* ESLint
* typescript
* Playwright
* karma
* jasmine

## Architektura

Aplikacja składa się z niezależnych standalone komponentów.
Główne elementy aplikacji:
* app 
  * components
    * add-pet, edit-pet, pet-details, pet-view - komponenty odpowiedzialne za główne funkcje aplikacji
    * shared: komponenty współdzielone i wykorzystywane w więcej niż jednym miejscu
  * interceptors
  * pipes
  * services
  * validators
  * models
* tests-e2e
