export interface Rocket {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: {
      cores: {
        core_serial: string;
        flight: number;
        land_success?: boolean;
        landing_type?: string;
        landing_vehicle?: string;
      }[];
    };
    second_stage: {
      payloads: {
        payload_id: string;
        nationality: string;
        manufacturer: string;
        payload_type: string;
        payload_mass_kg?: number;
        payload_mass_lbs?: number;
      }[];
    };
  }
  
  export interface Links {
    mission_patch: string;
    mission_patch_small: string;
    reddit_campaign: string | null;
    reddit_launch: string | null;
    reddit_recovery: string | null;
    reddit_media: string | null;
    presskit: string | null;
    article_link: string | null;
    wikipedia: string | null;
    video_link: string | null;
    youtube_id: string | null;
    flickr_images: string[];
  }
  
  export interface LaunchSite {
    site_id: string;
    site_name: string;
    site_name_long: string;
  }
  
  export interface Launch {
    flight_number: number;
    mission_name: string;
    mission_id: string[];
    upcoming: boolean;
    launch_year: string;
    launch_date_unix: number;
    launch_date_utc: string;
    launch_date_local: string;
    is_tentative: boolean;
    tentative_max_precision: string;
    tbd: boolean;
    launch_window?: number;
    rocket: Rocket;
    ships: string[];
    telemetry: {
      flight_club?: string;
    };
    launch_site: LaunchSite;
    launch_success?: boolean;
    land_success?: boolean;
    links: Links;
    details: string | null;
    static_fire_date_utc?: string;
    static_fire_date_unix?: number;
  }