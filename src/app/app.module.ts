import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperAgentBadgeComponent } from './super-agent/super-agent-badge/super-agent-badge.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperAgentBadgeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
