/// <reference types="cypress" />
import { BASE_URL } from '../../support/constants';
import { orderFormPage } from '../pages/orderFromView';
import { orderCardsPage } from '../pages/orderCardsView';

describe('Parcel tracking', () => {
  context('Order tracking form',  () => {
    beforeEach(() => {
      cy.visit(BASE_URL);
    });

    it('should have elements', () => {
      orderFormPage.getLogo()
        .should('have.attr', 'title', 'Parcel Company')
        .should('have.attr', 'href', '/');
      orderFormPage.getLegend().should('have.text', 'Enter your order number and zip code combination to see the order details and shipping updates');
    });

    it('displays error notification on invalid data', () => {
      orderFormPage.trackOrder('777', '888');
      orderFormPage.errorNotification().should('have.text', 'All fields should be filled with valid data.');
    });

    it('displays error notification on fetch order error', () => {
      orderFormPage.trackOrder('AB999777', '88888');
      orderFormPage.errorNotification().should('have.text', 'Your order was not found. Please check if entered data is correct.');
    });

    it('submits valid form and shows order cards view', () => {
      orderFormPage.trackOrder('AB20221219', '60156');
      orderCardsPage.getCardsWrapper().should('exist');
    });
  });

  describe('Order cards',  () => {
    before(() => {
      cy.visit(BASE_URL);
      orderFormPage.trackOrder('74328923203', '60156');
    });

    it('should show delivery card with data', () => {
      orderCardsPage.getCardsTitle(0).should('have.text', 'Ready for collection');
      orderCardsPage.getDeliveryCardStatus().should('have.text', 'The goods will be ready for collection on the next working day.');
      orderCardsPage.getMapLink()
        .should('have.attr', 'href', 'https://www.google.com/maps/place/Deutsche+Post+Filiale+426/@48.1601323,11.5732987,17z/data=!4m13!1m7!3m6!1s0x479e75c476d43137:0x170cb26ab86665fd!2sKurf%C3%BCrstenpl.+8,+80796+M%C3%BCnchen!3b1!8m2!3d48.1601287!4d11.5754874!3m4!1s0x479e7500ee0b5685:0xedf77ddb0bfe2602!8m2!3d48.1601164!4d11.5753654')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'title', 'Get Directions');
      orderCardsPage.getMapImage()
        .should('have.attr', 'src', 'https://raw.githubusercontent.com/parcelLab/challenge-frontend-engineer/main/map.png')
        .should('have.attr', 'alt', 'pickup map');
    });

    it('should show shipping card with data', () => {
      const checkpointsTexts = [
        'Ready for collectionThe goods will be ready for collection on the next working day.Munich07.01.2023, 02:30',
        'Failed delivery attemptUnfortunately, the goods could not be delivered. The goods are beeing forwarded to a pick-up location.Munich07.01.2023, 12:30',
        'In transitYour package is loaded and in transit to your area.Hamburg06.01.2023, 16:30',
        'RegisteredYour package was registered in our system by the sender.Hamburg05.01.2023, 13:30'
      ];
      orderCardsPage.getCardsTitle(1).should('have.text', 'Shipping Updates');
      orderCardsPage.getShippingProgressBarValue().should('have.attr', 'aria-valuenow', '90');
      orderCardsPage.getShippingCheckpoints().should('have.length', 4);
      orderCardsPage.getShippingCheckpoints().each((item, index) =>
        cy.wrap(item).should('have.text', checkpointsTexts[index]));

    });

    it('should show articles card with data', () => {
      orderCardsPage.getCardsTitle(2).should('have.text', 'Articles');
      orderCardsPage.getArticles().should('have.length', 1);
      orderCardsPage.getArticleImage(orderCardsPage.getArticles().eq(0))
        .should('have.attr', 'src', 'https://images.unsplash.com/photo-1639249227523-78502e9bb8b7')
        .should('have.attr', 'alt', 'Macbook Pro M2 Max 16inch');
      orderCardsPage.getArticleFeatures(orderCardsPage.getArticles().eq(0))
        .should('have.text', 'Macbook Pro M2 Max 16inchArticle number: AB30M216Qty: 14199€');
    });

    it('should have header', () => {
      orderCardsPage.getLogo()
        .should('have.attr', 'title', 'Parcel Company')
        .should('have.attr', 'href', '/');
      orderCardsPage.getSignOutButton().should('have.text', 'sign out');
      orderCardsPage.getSignOutButton().click();
      orderFormPage.getForm().should('exist');
    });
  });
});