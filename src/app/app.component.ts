import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

export interface Settings {
  settingForm: {
    name: string;
  };
  settingsFields: Array<{
    type: string;
    name: string;
  }>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    ToolbarModule,
    SplitterModule,
    ScrollPanelModule,
    FieldsetModule,
    NgTemplateOutlet,
    PanelModule,
    FormsModule,
    MonacoEditorModule,
    JsonPipe,
    ToastModule,
    RippleModule
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'prime-builder-form';

  constructor(private messageService: MessageService) {}

  formatoSalida!: Settings;

  editorOptions = {
    theme: 'vs-dark',
    language: 'json',
    wordWrap: 'on',
    automaticLayout: true,
  };

  code: string = this.getCode();

  public onEditorInit(editor: any) {
    editor.focus();
  }

  getCode() {
    const initialCode = `{
        "settingForm" : {
          "name" : "Mi primer formulario"
        },
        "settingsFields" : [
          {
            "type" : "text",
            "name" : "input_name"
          }
        ]
      }`;
    const parsed = JSON.parse(initialCode);
    this.formatoSalida = parsed;
    return JSON.stringify(parsed, null, 2);
  }

  onCodeChange() {
    try {
      const parsed = JSON.parse(this.code);
      this.formatoSalida = parsed;
      this.code = JSON.stringify(parsed, null, 2);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hemos encontrado un error en el formato del JSON' });
      console.error(error);
    }
  }
}
