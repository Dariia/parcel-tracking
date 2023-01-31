/// <reference types="cypress" />

import Chainable = Cypress.Chainable;

class OrderCards {
  getCardsWrapper(){
    return cy.get('[data-testid=order-cards-view]');
  }
  getAllCards(){
    return cy.get('[data-testid=order-card]');
  }
  getCardsTitle(cardIndex: number){
    return this.getAllCards().eq(cardIndex).find('[data-testid=order-card-title]');
  }
  getShippingProgressBarValue(){
    return cy.get('[data-testid=order-shipping-progressbar]').find('> div > div');
  }
  getShippingCheckpoints(){
    return cy.get('[data-testid=order-shipping-checkpoint]');
  }
  getArticles(){
    return cy.get('[data-testid=order-card-item]');
  }
  getArticleImage(article: Chainable){
    return article.find('[data-testid=order-card-item-image]');
  }
  getArticleFeatures(article: Chainable){
    return article.find('[data-testid=order-item-features]');
  }
  getDeliveryCardStatus(){
    return cy.get('[data-testid=order-card-delivery-status]');
  }
  getLogo(){
    return cy.get('[data-testid=logo]');
  }
  getMapImage(){
    return cy.get('[data-testid=order-delivery-map-image]');
  }
  getMapLink(){
    return cy.get('[data-testid=order-delivery-map-link]');
  }
  getSignOutButton(){
    return cy.get('[data-testid=header-sign-out-button]');
  }
}

export const orderCardsPage =  new OrderCards();

