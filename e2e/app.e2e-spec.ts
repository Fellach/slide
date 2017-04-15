import { SlidePage } from './app.po';

describe('slide App', () => {
  let page: SlidePage;

  beforeEach(() => {
    page = new SlidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
