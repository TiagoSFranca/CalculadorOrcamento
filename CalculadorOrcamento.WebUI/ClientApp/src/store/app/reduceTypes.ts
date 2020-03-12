import { ISnackBar, ISnackBarType } from 'utils/snackBar'

export interface ToggleDrawerAction { type: 'TOGGLE_DRAWER' };

export interface ChangePageTitleAction { type: 'CHANGE_PAGE_TITLE', value: '' };

export interface ShowSnackBarAction { type: 'SHOW_SNACK_BAR_ACTION', snack?: ISnackBar };

export interface HideSnackBarAction { type: 'HIDE_SNACK_BAR_ACTION' };