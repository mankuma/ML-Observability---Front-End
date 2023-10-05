import { Component } from '@angular/core';
import { ToolbarPosition, VizCreateOptions } from 'ngx-tableau';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  options: VizCreateOptions = {
    hideTabs: true,
    hideToolbar: false,
    disableUrlActionsPopups: true,
    toolbarPosition: ToolbarPosition.TOP,
    onFirstInteractive: (event) => {
      console.log('On first interactive event!', event);
    }
  };
}
