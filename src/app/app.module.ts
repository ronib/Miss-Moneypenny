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
import { HackatonService } from './services/hackaton.service';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DialogflowService,
    HackatonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
