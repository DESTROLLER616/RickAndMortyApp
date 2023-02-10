import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Character } from "@app/shared/interfaces/character.interface";

@Component({
    selector: 'app-character',
    templateUrl: './character.component.html',
    styleUrls: ['./character.component.css']
})

export class characterComponent {
    @Input() character?: Character
}