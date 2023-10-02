import { Component, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ModuleDeclaration } from '@syncfusion/ej2-base';
import { Tab, TabAnimationSettingsModel } from '@syncfusion/ej2-navigations';
import { RibbonTabModel, RibbonGroupModel, RibbonCollectionModel, RibbonItemModel, FileMenuSettingsModel } from '../models/index';
import { RibbonModel } from './ribbon-model';
import { ExpandCollapseEventArgs, LauncherClickEventArgs, RibbonLayout, ribbonTooltipData, TabSelectedEventArgs, TabSelectingEventArgs } from './interface';
import { RibbonButton, RibbonComboBox, RibbonCheckBox, RibbonDropDown, RibbonColorPicker, RibbonSplitButton } from '../items/index';
import { RibbonFileMenu } from '../modules/index';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
/**
 * The Ribbon Component is a structured layout to manage tools with tabs and groups.
 */
export declare class Ribbon extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Specifies the active layout of the ribbon.
     * Accepts one of the below values.
     * * Classic – Renders the ribbon tab contents in classic layout.
     * * Simplified – Renders the ribbon tab contents in single row.
     *
     * @isenumeration true
     * @default RibbonLayout.Classic
     * @asptype RibbonLayout
     */
    activeLayout: RibbonLayout | string;
    /**
     * Defines one or more CSS classes to customize the appearance of ribbon.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines the properties of ribbon file menu.
     *
     * @default {}
     */
    fileMenu: FileMenuSettingsModel;
    /**
     * Defines the icon CSS for the launcher icon button in group header.
     *
     * @default ''
     */
    launcherIconCss: string;
    /**
     * Specifies whether the ribbon is minimized or not.
     * When minimized, only the tab header is shown.
     *
     * @default false
     */
    isMinimized: boolean;
    /**
     * Provides the localization value for the controls present in ribbon items.
     *
     * @default 'en-us'
     */
    locale: string;
    /**
     * Specifies the index of the current active tab.
     *
     * @default 0
     */
    selectedTab: number;
    /**
     * Specifies the animation configuration settings for showing the content of the Ribbon Tab.
     *
     * @default { previous: { effect: 'SlideLeftIn', duration: 600, easing: 'ease' },next: { effect: 'SlideRightIn', duration: 600, easing: 'ease' } }
     */
    tabAnimation: TabAnimationSettingsModel;
    /**
     * Defines the list of ribbon tabs.
     *
     * @default []
     */
    tabs: RibbonTabModel[];
    /**
     * Specifies the width of the ribbon.
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Specifies the template content for the help pane of ribbon.
     * The help pane appears on the right side of the ribbon header row.
     *
     * @default ''
     * @aspType string
     */
    helpPaneTemplate: string | HTMLElement | Function;
    /**
     * Event triggers before selecting the tab item.
     *
     * @event tabSelecting
     */
    tabSelecting: EmitType<TabSelectingEventArgs>;
    /**
     * Event triggers after selecting the tab item.
     *
     * @event tabSelected
     */
    tabSelected: EmitType<TabSelectedEventArgs>;
    /**
     * Event triggers before expanding the ribbon.
     *
     * @event ribbonExpanding
     */
    ribbonExpanding: EmitType<ExpandCollapseEventArgs>;
    /**
     * Event triggers before collapsing the ribbon.
     *
     * @event ribbonCollapsing
     */
    ribbonCollapsing: EmitType<ExpandCollapseEventArgs>;
    /**
     * Event triggers when the launcher icon of the group is clicked.
     *
     * @event launcherIconClick
     */
    launcherIconClick: EmitType<LauncherClickEventArgs>;
    /**
     * The `ribbonButtonModule` is used to create and manipulate buttons in ribbon item.
     */
    ribbonButtonModule: RibbonButton;
    /**
     * The `ribbonDropDownModule` is used to create and manipulate dropdown buttons in ribbon item.
     */
    ribbonDropDownModule: RibbonDropDown;
    /**
     * The `ribbonSplitButtonModule` is used to create and manipulate split buttons in ribbon item.
     */
    ribbonSplitButtonModule: RibbonSplitButton;
    /**
     * The `ribbonCheckBoxModule` is used to create and manipulate checkbox in ribbon item.
     */
    ribbonCheckBoxModule: RibbonCheckBox;
    /**
     * The `ribbonColorPickerModule` is used to create and manipulate color picker in ribbon item.
     */
    ribbonColorPickerModule: RibbonColorPicker;
    /**
     * The `ribbonComboBoxModule` is used to create and manipulate combobox in ribbon item.
     */
    ribbonComboBoxModule: RibbonComboBox;
    /**
     * The `ribbonFileMenuModule` is used to create and manipulate the ribbon file menu.
     */
    ribbonFileMenuModule: RibbonFileMenu;
    private itemIndex;
    private idIndex;
    private isAddRemove;
    private collapseButton;
    private ribbonTempEle;
    private scrollModule;
    private currentControlIndex;
    private keyboardModuleRibbon;
    private keyConfigs;
    /** @hidden */
    overflowDDB: DropDownButton;
    /** @hidden */
    tabsInternal: RibbonTabModel[];
    /** @hidden */
    tabObj: Tab;
    /** @hidden */
    tooltipData: ribbonTooltipData[];
    /**
     * Constructor for creating the widget.
     *
     * @param  {RibbonModel} options - Specifies the ribbon model
     * @param  {string|HTMLDivElement} element - Specifies the target element
     */
    constructor(options?: RibbonModel, element?: string | HTMLElement);
    /**
     * Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    protected render(): void;
    protected preRender(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    protected getPersistData(): string;
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    protected getModuleName(): string;
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - returns module declaration.
     * @hidden
     */
    protected requiredModules(): ModuleDeclaration[];
    private initialize;
    private wireEvents;
    private wireKeyboardEvent;
    private keyActionHandler;
    private handleNavigation;
    private resizeHandler;
    private renderTabs;
    private minimize;
    private toggleLayout;
    private tabCreated;
    private ribbonTabSelected;
    private checkOverflow;
    private checkSimplifiedItemShrinking;
    private checkSimplifiedItemExpanding;
    private createSimplfiedOverflow;
    private updatePopupItems;
    private removeSimplfiedOverflow;
    private createOverflowPopup;
    private addOverflowEvents;
    private createOfTabContainer;
    private checkGroupShrinking;
    private checkValidCollectionLength;
    private checkClassicCollection;
    private checkClassicItem;
    private checkLargeToMedium;
    private checkMediumToSmall;
    private checkGroupExpanding;
    private checkSmallToMedium;
    private checkMediumToLarge;
    private setItemSize;
    private createOverflowDropdown;
    private removeOverflowDropdown;
    private removeDropdown;
    private getGroupResizeOrder;
    private destroyScroll;
    private clearOverflowDropDown;
    private ribbonTabSelecting;
    private createTabItems;
    private renderInitialTab;
    private addOverflowButton;
    private upDownKeyHandler;
    private findDisabledItem;
    private removeOverflowButton;
    private removeOverflowEvent;
    private createGroupContainer;
    private addExpandCollapse;
    private removeExpandCollapse;
    private reRenderTabs;
    private switchLayout;
    private createLauncherIcon;
    private launcherIconClicked;
    private createGroups;
    private validateItemSize;
    private createCollection;
    private createRibbonItem;
    private createItems;
    private createHelpPaneTemplate;
    private createTemplateContent;
    private renderItemTemplate;
    private checkID;
    private updateCommonProperty;
    private removeLauncherIcon;
    private destroyTabItems;
    private destroyFunction;
    private getItemModuleName;
    private clearOverflowResize;
    /**
     * Refreshes the layout.
     *
     * @returns {void}
     */
    refreshLayout(): void;
    /**
     * Selects the tab
     *
     * @param  {string} tabId - Gets the tab ID
     * @returns {void}
     */
    selectTab(tabId: string): void;
    /**
     * Adds the ribbon tab.
     *
     * @param {RibbonTabModel} tab - Gets the ribbon tab model
     * @param {string} targetId  - Gets the ID of the target tab to add the new tab.
     * @param {boolean} isAfter - Defines whether the tab is added before or after the target.
     * @returns {void}
     */
    addTab(tab: RibbonTabModel, targetId?: string, isAfter?: boolean): void;
    /**
     * Removes the ribbon tab.
     *
     * @param {string} tabId - Gets the tab ID
     * @returns {void}
     */
    removeTab(tabId: string): void;
    /**
     * Adds the ribbon group.
     *
     * @param {string} tabId - Gets the tab ID.
     * @param {RibbonGroupModel} group - Gets the ribbon group model.
     * @param {string} targetId - Gets the ID of the target group to add the new group.
     * @param {boolean} isAfter - Defines whether the group is added before or after the target.
     * @returns {void}
     */
    addGroup(tabId: string, group: RibbonGroupModel, targetId?: string, isAfter?: boolean): void;
    /**
     * Removes the ribbon group.
     *
     * @param {string} groupId -Gets the group ID.
     * @returns {void}
     */
    removeGroup(groupId: string): void;
    /**
     * adds the ribbon collection.
     *
     * @param {string} groupId - Gets the ribbon group ID.
     * @param {RibbonCollectionModel} collection - Gets the ribbon collection model.
     * @param {string} targetId - Gets the ID of the target collection to add the new collection.
     * @param {boolean} isAfter - Defines whether the collection is added before or after the target.
     * @returns {void}
     */
    addCollection(groupId: string, collection: RibbonCollectionModel, targetId?: string, isAfter?: boolean): void;
    /**
     * Removes the ribbon collection.
     *
     * @param {string} collectionId - Gets the collection ID.
     * @returns {void}
     */
    removeCollection(collectionId: string): void;
    /**
     * Adds ribbon item.
     *
     * @param {string} collectionId - Gets the collection ID.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {string} targetId - Gets the ID of the target item to add the new item.
     * @param {boolean} isAfter - Defines whether the item is added before or after the target.
     * @returns {void}
     */
    addItem(collectionId: string, item: RibbonItemModel, targetId?: string, isAfter?: boolean): void;
    /**
     * Removes ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    removeItem(itemId: string): void;
    /**
     * tab - Gets the ribbon tab to be updated. The id of the tab is a required property. Other properties are optional.
     *
     * @param {RibbonTabModel} tab - Gets the ribbon tab model.
     * @returns {void}
     */
    updateTab(tab: RibbonTabModel): void;
    /**
     * group - Gets the ribbon group to be updated. The id of the group is a required property. Other properties are optional.
     *
     * @param {RibbonGroupModel} group - Gets the ribbon group model.
     * @returns {void}
     */
    updateGroup(group: RibbonGroupModel): void;
    /**
     * collection - Gets the ribbon collection to be updated. The id of the collection is a required property. Other properties are optional.
     *
     * @param {RibbonCollectionModel} collection - Gets the ribbon collection model.
     * @returns {void}
     */
    updateCollection(collection: RibbonCollectionModel): void;
    /**
     * item - Gets the ribbon item to be updated. The id of the item is a required property. Other properties are optional.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     */
    updateItem(item: RibbonItemModel): void;
    private removeItemElement;
    /**
     * Enables ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    enableItem(itemId: string): void;
    /**
     * Disables ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    disableItem(itemId: string): void;
    private enableDisableItem;
    private unwireEvents;
    destroy(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {RibbonModel} newProp - Specifies new properties
     * @param  {RibbonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: RibbonModel, oldProp?: RibbonModel): void;
}
