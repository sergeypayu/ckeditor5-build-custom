
import type {
	FileBrowser,
	FileBrowserUI,
	FileBrowserEditing,
	FileBrowserCommand,
	FileBrowserConfig
} from './index';

declare module '@ckeditor/ckeditor5-core' {
	interface EditorConfig {
		fileBrowser?: FileBrowserConfig;
	}

	interface PluginsMap {
		[ FileBrowser.pluginName ]: FileBrowser;
		[ FileBrowserUI.pluginName ]: FileBrowserUI;
		[ FileBrowserEditing.pluginName ]: FileBrowserEditing;
	}

	interface CommandsMap {
		fileBrowser: FileBrowserCommand;
	}
}
