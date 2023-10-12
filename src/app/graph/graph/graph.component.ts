import { Component } from '@angular/core';
import { ToolbarPosition, VizCreateOptions } from 'ngx-tableau';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  constructor(private userService: UserService) { }
  options: VizCreateOptions = {
    hideTabs: true,
    hideToolbar: false,
    disableUrlActionsPopups: true,
    toolbarPosition: ToolbarPosition.TOP,
    onFirstInteractive: (event) => {
      // console.log('On first interactive event!', event);
    }
  };
}
