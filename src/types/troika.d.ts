// troika-three-text (used by drei <Text>) ships no types; we only use this one setting (HeroScene).
declare module "troika-three-text" {
  export function configureTextBuilder(config: { useWorker?: boolean }): void;
}
