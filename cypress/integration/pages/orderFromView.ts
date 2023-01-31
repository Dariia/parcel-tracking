/// <reference types="cypress" />

class OrderForm {
  getZipCodeInput(){
    return cy.get('[data-testid=order-form-zip-field]').find('input');
  }
  getTrackingCodeInput(){
    return cy.get('[data-testid=order-form-code-field]').find('input');
  }
  getForm(){
    return cy.get('[data-testid=order-form]');
  }
  getLogo(){
    return cy.get('[data-testid=logo]');
  }
  getLegend(){
    return cy.get('[data-testid=order-form-text]');
  }
  errorNotification(){
    return cy.get('[data-testid=order-form-code-notification]');
  }

  trackOrder (code: string, zip: string) {
    this.getZipCodeInput().clear().type(zip);
    this.getTrackingCodeInput().clear().type(code);
    this.getForm().submit();
  }
}

export const orderFormPage =  new OrderForm();

