import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DialogflowService } from '@app/services';
import { MessageListComponent, MessageFormComponent, MessageItemComponent } from '@app/components';
import { SettingsComponent } from './settings/settings.component';
import { ScenariosComponent } from './settings/scenarios/scenarios.component';
import { RulesComponent } from './settings/rules/rules.component'
import { AppRoutingModule } from './app.routing.module';
import { ChatbotComponent } from './chatbot/chatbot.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageItemComponent,
    SettingsComponent,
    ScenariosComponent,
    RulesComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    DialogflowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
