import { ATTACKPage } from './app.po';

describe('attack App', () => {
  let page: ATTACKPage;

  beforeEach(() => {
    page = new ATTACKPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
