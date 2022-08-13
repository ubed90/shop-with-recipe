import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./components/alert/alert.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { DropdownDirective } from "./directives/dropdown.directive";
import { PlaceholderDirective } from "./directives/placeholder/placeholder.directive";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingComponent,
        DropdownDirective,
        PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingComponent,
        DropdownDirective,
        PlaceholderDirective,
        CommonModule
    ]
})
export class SharedModule {

}