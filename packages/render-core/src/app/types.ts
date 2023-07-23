import { Component } from 'vue';
import { WinAppConstructorOpt } from './app';

export interface AppOrigin extends Partial<Omit<WinAppConstructorOpt, 'comp'>> {
  name: string;
  icon: string;
  headerComp?: Component;
  bodyComp?: Component;
}
