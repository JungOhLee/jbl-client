import { JblPage } from './app.po';

describe('jbl App', () => {
  let page: JblPage;

  beforeEach(() => {
    page = new JblPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
