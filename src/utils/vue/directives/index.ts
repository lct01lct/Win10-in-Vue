import { App, Directive } from 'vue';
import { withInstallDirective } from '../';
const files = import.meta.glob('./**.ts', { eager: true });

interface FileModule {
  name: string;
  directive: Directive;
}

const installDirective = (app: App) => {
  for (const path in files) {
    const module = files[path] as FileModule;
    withInstallDirective(module.directive, module.name)(app);
  }
};

export default installDirective;

export type { DragBindingValue } from './drag';
export type { infiniteScrollBindingValue } from './infinite-scroll';
export type { ResizeBindingValue } from './resize';
