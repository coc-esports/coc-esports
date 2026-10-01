// troika-three-text ships no types; we only use this one setting.
declare module "troika-three-text" {
  export function configureTextBuilder(config: { useWorker?: boolean }): void;
}
