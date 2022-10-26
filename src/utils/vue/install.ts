import { App } from 'vue';
import type { Directive } from 'vue';

export const withInstallDirective = <T>(directive: T, name: string) => {
  return (app: App) => {
    app.directive(name, directive as Directive);
  };
};
