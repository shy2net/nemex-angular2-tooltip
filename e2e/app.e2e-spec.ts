import { NemexTooltipPage } from './app.po';

describe('nemex-tooltip App', () => {
  let page: NemexTooltipPage;

  beforeEach(() => {
    page = new NemexTooltipPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
