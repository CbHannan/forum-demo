import { SocialnetworkPage } from './app.po';

describe('socialnetwork App', function() {
  let page: SocialnetworkPage;

  beforeEach(() => {
    page = new SocialnetworkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
