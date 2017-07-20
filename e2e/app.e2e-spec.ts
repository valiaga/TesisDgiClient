import { TesisDgiClientPage } from './app.po';

describe('tesis-dgi-client App', () => {
  let page: TesisDgiClientPage;

  beforeEach(() => {
    page = new TesisDgiClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to dgi!');
  });
});
