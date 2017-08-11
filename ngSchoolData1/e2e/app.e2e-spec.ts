import { NgSchoolDataPage } from './app.po';

describe('ng-school-data App', () => {
  let page: NgSchoolDataPage;

  beforeEach(() => {
    page = new NgSchoolDataPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
