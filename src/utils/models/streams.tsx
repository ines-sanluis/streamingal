export interface ProviderType {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface Streams {
  link: string;
  free?: Array<ProviderType>;
  rent?: Array<ProviderType>;
  buy?: Array<ProviderType>;
  flatrate?: Array<ProviderType>;
}
