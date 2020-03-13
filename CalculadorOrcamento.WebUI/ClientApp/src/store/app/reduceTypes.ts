import { ISnackBar } from 'utils/snackBar';
import { LoadingItem } from './models';

export interface ToggleDrawerAction { type: 'TOGGLE_DRAWER' };

export interface ChangePageTitleAction { type: 'CHANGE_PAGE_TITLE', value: string };

export interface ShowSnackBarAction { type: 'SHOW_SNACK_BAR_ACTION', snack?: ISnackBar };

export interface HideSnackBarAction { type: 'HIDE_SNACK_BAR_ACTION' };

export interface IsLoadingAppAction { type: 'IS_LOADING_APP', value: boolean }

export interface SetLoadingComponent { type: 'SET_LOADING_COMPONENT', item: LoadingItem }