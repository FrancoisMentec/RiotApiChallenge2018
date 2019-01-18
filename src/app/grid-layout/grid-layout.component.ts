import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { EditGridService } from '../edit-grid.service';
import { BlockComponent } from '../block/block.component'
import { WelcomeComponent } from '../welcome/welcome.component'
import { PopupComponent } from '../popup/popup.component'

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {
  @ViewChild('settings') popup: PopupComponent;
  @ViewChild('grid') grid;
  @ViewChild('grid', { read: ViewContainerRef }) blocksContainer: ViewContainerRef;

  private _configName: string = 'default'
  configNameToSave: string; // Used for the text-field to save config
  @Input() blocksWidth = 250;
  @Input() blocksHeight = 100;
  @Input() margin = 8;
  @Input() cols = 5;
  @Input() lines = 8;
  blocks = [];

  constructor(private resolver: ComponentFactoryResolver, private dataService: DataService, private editGridService: EditGridService) {
    this.editGridService.gridLayout = this
  }

  ngOnInit() {
    let c = this.dataService.getCookie('DefaultConfig')
    if (this.configsNames.indexOf(c) >= 0) this.loadConfig(c) // There is a config by default
    else if (this.configsNames.length > 0) this.loadConfig(this.configsNames[0])
    else {
      this.addBlock(0, 0, 1, 1, 'summoner')
      this.addBlock(4, 0, 1, 8, 'champions')
      this.addBlock(0, 1, 1, 2, 'leagues')
      this.addBlock(1, 0, 1, 3)
      this.saveConfig('default', false)
    }
  }

  saveConfig(name: string, notify: boolean = true) {
    this._configName = name
    let configs = JSON.parse(this.dataService.getCookie('GridLayoutConfigs')) || {}
    configs[name] = this.config
    this.dataService.setCookie('GridLayoutConfigs', configs)
    if (notify) alert(`Config saved as "${name}"`)
  }

  loadConfig(name: string) {
    let configs = JSON.parse(this.dataService.getCookie('GridLayoutConfigs'))
    this.config = configs[name]
    this.dataService.setCookie('DefaultConfig', this.configName)
    this.configNameToSave = name
  }

  /**
   * Return a config object to save the grid
   */
  get config() {
    let blocks = []
    for (let i = 0; i < this.blocks.length; i++) {
      blocks.push(this.blocks[i].config)
    }
    return {
      configName: this.configName,
      blocksWidth: this.blocksWidth,
      blocksHeight: this.blocksHeight,
      margin: this.margin,
      cols: this.cols,
      lines: this.lines,
      blocks: blocks
    }
  }

  /**
   * Load the grid from a config object
   */
  set config(config) {
    if (typeof config != 'object') return
    this.removeAllBlocks()
    this._configName = config.configName
    this.blocksWidth = config.blocksWidth
    this.blocksHeight = config.blocksHeight
    this.margin = config.margin
    this.cols = config.cols
    this.lines = config.lines
    for (let i = 0; i < config.blocks.length; i++) {
      let block = config.blocks[i]
      this.addBlock(block.x, block.y, block.cols, block.lines, block.template, block.settings)
    }
  }

  get configName() {
    return this._configName
  }

  set configName(name: string) {
    this.loadConfig(name)
  }

  get configsNames (): Array<string> {
    let configs = JSON.parse(this.dataService.getCookie('GridLayoutConfigs')) || {}
    return Object.keys(configs)
  }

  get viewClass() {
    return this.editGridService.edit
      ? 'visible'
      : '';
  }

  get width() : number {
    return this.cols * (this.blocksWidth + this.margin);
  }

  get height() : number {
    return this.lines * (this.blocksHeight + this.margin);
  }

  /**
   * Return the block coordinates corresponding to the pixel coordinates (x, y)
   * @param {number} x - x coordinate in pixel (example: event.clientX)
   * @param {number} y - y coordinate in pixel (example: event.clientY)
   * @return {object} {x: number, y: number} - coordinates of the block at the given position
   */
  getCoord(x: number, y: number) {
    let rect = this.grid.nativeElement.getBoundingClientRect()
    return {
      x: Math.floor((x - rect.x) / (this.blocksWidth + this.margin)),
      y: Math.floor((y - rect.y) / (this.blocksHeight + this.margin))
    }
  }

  arr(n, v=0) {
    return Array(n).fill(v)
  }

  /**
   * add a new block to the grid
   * @param x_or_e - can either be the x coordinate on the grid or an user event like a click
   */
  addBlock(x_or_e, y=0, cols=1, lines=1, template=null, settings=null) {
    let x = null
    if (x_or_e instanceof MouseEvent) {
      let coord = this.getCoord(x_or_e.clientX, x_or_e.clientY)
      x = coord.x
      y = coord.y
    } else {
      x = x_or_e
    }

    let blockFactory = this.resolver.resolveComponentFactory(BlockComponent)
    let blockRef = this.blocksContainer.createComponent(blockFactory)
    let block = blockRef.instance
    block.parent = this
    block.selfRef = blockRef
    block.x = x
    block.y = y
    block.cols = cols
    block.lines = lines
    if (template) block.template = template
    if (settings) block.settings = settings
    this.blocks.push(block)
    this.blocksContainer.insert(blockRef.hostView)
  }

  removeAllBlocks() {
    while (this.blocks.length > 0) {
      this.removeBlock(this.blocks[0])
    }
  }

  /**
   * Remove a block
   * @param block - block to remove
   *
   * BUG: When a block is removed new block aren't visible (they exists but angular don't had them to the DOM)
   * WORKAROUND: removeBlock make blocks invisible (they are removed when the page is refreshed)
   */
  removeBlock(block: BlockComponent) {
    this.blocks.splice(this.blocks.indexOf(block), 1)
    block.visible = false
    /*let index = this.blocksContainer.indexOf(block.selfRef)
    this.blocksContainer.remove(index)*/
  }
}
