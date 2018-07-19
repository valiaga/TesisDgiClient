import { TesistasModule } from './tesistas.module';

describe('TesistasModule', () => {
  let tesistasModule: TesistasModule;

  beforeEach(() => {
    tesistasModule = new TesistasModule();
  });

  it('should create an instance', () => {
    expect(tesistasModule).toBeTruthy();
  });
});
