import { Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export type CompType<Comp extends abstract new (...args: any) => any> = InstanceType<Comp> | null;
