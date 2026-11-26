export interface AdminProfileMenuProps {
  /** Opens the profile flow. Disabled until supplied by the app. */
  readonly onProfile?: () => void;
  /** Runs the app authentication sign-out flow. Disabled until supplied. */
  readonly onSignOut?: () => void;
}
