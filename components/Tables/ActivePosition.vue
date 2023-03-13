<template>
  <v-row v-if="checkMobile() == false && this.user">
    <BaseModal @close="test1 = false" :parentModel="test1" :maxWidth="'650'">
      <ModalsLearnHowItWorks
        @close-modal="test1 = false"
      ></ModalsLearnHowItWorks>
    </BaseModal>
    <v-dialog persistent v-if="showAddBot" v-model="showAddBot" max-width="600">
      <template>
        <ModalsBotSetup
          :bot-prop="selectedBot"
          :exchange="selectedExchange"
          @close-modal="closeModal"
        />
      </template>
    </v-dialog>
    <ModalsActivePosition
      v-if="showActivePosition"
      :persistent="true"
      :detail="botsDetail"
      :pair="selectedPair"
      :parentModel="showActivePosition"
      @close-modal="closeModal"
      @close="showActivePosition = false"
    />
    <v-dialog v-model="dialogDelete" max-width="400px" persistent>
      <v-card>
        <v-card-title class="headline"> Delete Bot Confirmation </v-card-title>
        <v-card-text>
          Are you sure you want to delete this bot setup?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="deleteItemConfirm"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      dark
      bottom
      color="success"
      elevation="15"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-col
      v-if="showExchangeCards && userExchangesLoaded"
      cols="12"
      class="d-flex px-0 pt-10"
    >
      <v-col
        v-for="(exchange, index) in exchanges"
        :key="index"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          @click="selectExchangeCard(`${exchange.name}`, exchange, index)"
          style="position: relative; margin-bottom: 25px"
          :class="
            exchange.comingsoon
              ? 'd-flex align-center justify-center exchange-card disabled'
              : 'd-flex align-center justify-center exchange-card'
          "
          flat
        >
          <v-row justify="center" align="center" class="pa-5">
            <v-col
              cols="5"
              class="d-flex justify-center"
              style="position: relative"
            >
              <div class="custom-avatar off-white-3">
                <v-img contain :src="exchange.image"></v-img>
              </div>
              <h4 class="text-body-1 font-weight-bold mt-5">
                {{ exchange.name }}
              </h4>
            </v-col>
            <v-col cols="7" class="d-flex justify-center align-center">
              <template v-if="exchange.active">
                <v-btn
                  @click="_addBot(exchange)"
                  class="mx-2"
                  fab
                  x-small
                  outlined
                  color="primary"
                >
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  @click="_deleteBot(exchange)"
                  class="mx-2"
                  fab
                  x-small
                  outlined
                  color="danger"
                >
                  <v-icon dark> mdi-delete </v-icon>
                </v-btn></template
              >

              <v-btn
                v-else
                :disabled="
                  !user.subscription ||
                  user.subscription == false ||
                  exchange.comingsoon
                "
                @click="_addBot(exchange)"
                class="mx-2"
                small
                color="primary"
              >
                <!-- <v-icon dark> mdi-cog </v-icon> -->
                <span>Create your bot</span>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col
                  cols="12"
                  v-for="(item, i) in exchange.summary"
                  :key="`item-summary-${i}`"
                >
                  <v-card flat rounded color="off-white">
                    <v-list-item>
                      <v-icon size="20" class="mr-4" color="primary">
                        {{ _determineIcon(item.title) }}
                      </v-icon>

                      <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                          {{ item.title }}
                        </v-list-item-title>

                        <v-list-item-subtitle
                          class="text-body-1 font-weight-bold basic-text--text"
                        >
                          <template v-if="i == 1 || i == 3">
                            {{ item.value | toCurrency }}</template
                          >
                          <template v-else> {{ item.value }}</template>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- ORNAMENTS -->
          <v-list-item-avatar
            v-if="exchange.selected"
            class="exchange-checkmark"
            size="25"
            color="#27D79E"
          >
            <v-icon color="white" small> mdi-check </v-icon>
          </v-list-item-avatar>
          <div v-if="exchange.selected" class="ornament o1"></div>
          <!-- ORNAMENTS END -->
        </v-card>
      </v-col>
    </v-col>

    <v-col
      v-else-if="showExchangeCards && !userExchangesLoaded"
      cols="12"
      class="d-flex px-0 pt-10"
    >
      <v-col
        v-for="(exchange, index) in exchanges"
        :key="index"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          style="position: relative; margin-bottom: 25px"
          :class="
            exchange.comingsoon
              ? 'd-flex align-center justify-center exchange-card disabled'
              : 'd-flex align-center justify-center exchange-card'
          "
          flat
        >
          <v-row justify="center" align="center" class="pa-5">
            <v-col
              cols="5"
              class="d-flex justify-center"
              style="position: relative"
            >
              <div class="custom-avatar off-white-3">
                <v-skeleton-loader type="avatar"></v-skeleton-loader>
              </div>
              <v-skeleton-loader type="heading"></v-skeleton-loader>
            </v-col>
            <v-col cols="7" class="d-flex justify-center align-center">
              <v-skeleton-loader type="button"></v-skeleton-loader>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col
                  cols="12"
                  v-for="(item, i) in exchange.summary"
                  :key="`item-summary-${i}`"
                >
                  <v-skeleton-loader
                    max-height="50px"
                    type="list-item-two-line"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-col>

    <v-col cols="12">
      <v-btn
        rounded
        class="text-capitalize"
        color="primary"
        depressed
        @click="test1 = true"
      >
        Learn how it works
      </v-btn>
    </v-col>

    <v-col cols="12">
      <v-card v-show="showTabs" class="pa-3 mb-5" flat rounded>
        <v-tabs class="pa-2" v-model="currentItem">
          <v-tab :ripple="false" v-for="item in tables" :key="item">
            <span class="text-body-1 text-capitalize">{{ item }}</span>
          </v-tab>
        </v-tabs>
      </v-card>
      <v-card class="pa-3" flat rounded>
        <v-tabs-items v-model="currentItem">
          <v-tab-item key="Active Positions">
            <v-card :key="`${counter}-default`" class="pa-8" flat>
              <v-row class="mb-3" justify="end" align="end">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="searchQuery"
                    placeholder="Search By Pair"
                    rounded
                    :hide-details="true"
                    class="custom-input off-white"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="mr-4 primary--text">mdi-magnify</v-icon>
                    </template></v-text-field
                  >
                </v-col>
              </v-row>

              <v-data-table
                style="overflow-y: scroll; height: 50vh; overflow-x: hidden"
                @click:row="_onSelectPair"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :headers="headers"
                :items="activePositionFiltered"
                :loading="isLoading"
                class="elevation-0"
                loading-text="Loading... Please wait"
              >
                <template v-slot:header.pair="{ header }">
                  <strong
                    class="basic-text--text text-body-1 font-weight-bold"
                    >{{ header.text }}</strong
                  >
                </template>
                <template v-slot:header.price="{ header }">
                  <strong
                    class="basic-text--text text-body-1 font-weight-bold"
                    >{{ header.text }}</strong
                  >
                </template>
                <template v-slot:header.profit="{ header }">
                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <strong
                        v-bind="attrs"
                        v-on="on"
                        class="basic-text--text text-body-1 font-weight-bold"
                      >
                        {{ header.text }}
                      </strong>
                    </template>
                    <div style="max-width: 200px">
                      Please note that the data provided below represents the
                      total of both realized and floating profit and losses
                      (PNL). It is important to keep in mind that the floating
                      PNL is not finalized and will remain subject to change.
                    </div>
                  </v-tooltip>
                </template>
                <template v-slot:header.status="{ header }">
                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <strong
                        v-bind="attrs"
                        v-on="on"
                        class="basic-text--text text-body-1 font-weight-bold"
                      >
                        {{ header.text }}
                      </strong>
                    </template>
                    <div>
                      <ol>
                        <li>ACTIVE - Lorem ipsum</li>
                        <li>WAITING FOR POSITION - Lorem ipsum</li>
                        <li>INACTIVE - Lorem ipsum</li>
                        <li>BLACKLISTED - Lorem ipsum</li>
                      </ol>
                    </div>
                  </v-tooltip>
                </template>

                <template v-slot:item.pair="{ item }">
                  <v-row class="py-2">
                    <v-col cols="12" class="d-flex align-center justify-start">
                      <v-list-item-avatar class="ma-0">
                        <v-img
                          style="width: 28px !important"
                          @error="errorHandler"
                          max-width="28"
                          max-height="28"
                          :alt="item.logo"
                          :src="getImgUrl(item.pair_from)"
                        ></v-img>
                      </v-list-item-avatar>
                      <div class="d-flex flex-column ml-3">
                        <div class="d-flex">
                          <span class="text-subtitle-2 font-weight-bold"
                            >{{ item.pair_from }} / {{ item.pair_to }}
                          </span>
                        </div>
                        <span class="text-subtitle-2">{{ item.quantity }}</span>
                      </div>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.price="{ item }">
                  <div class="d-flex flex-column align-start justify-center">
                    <span class="text-subtitle-2 font-weight-bold">{{
                      item.price.value
                    }}</span>
                    <span
                      v-if="parseFloat(item.price.percentage) < 0"
                      class="danger--text text-subtitle-2 font-weight-bold"
                      >{{ item.price.percentage }}%</span
                    >
                    <span
                      v-else
                      class="success--text text-subtitle-2 font-weight-bold"
                      >{{ item.price.percentage }}%</span
                    >
                  </div>
                </template>
                <template v-slot:item.profit="{ item }">
                  <div class="d-flex flex-column align-start justify-center">
                    <!-- <code>{{item.status}}</code> -->
                    <strong
                      class="danger--text text-subtitle-2 font-weight-bold"
                      v-if="
                        item.status == 'ACTIVE' &&
                        parseFloat(item.profit.percentage) < 0
                      "
                      >{{ item.profit.percentage }}%</strong
                    >
                    <strong
                      class="success--text text-subtitle-2 font-weight-bold"
                      v-if="
                        item.status == 'ACTIVE' &&
                        parseFloat(item.profit.percentage) > 0
                      "
                      >{{ item.profit.percentage }}%</strong
                    >
                    <strong
                      class="primary--text text-subtitle-2 font-weight-bold"
                      v-if="
                        item.status == 'INACTIVE' ||
                        item.status == 'WAITING_POSITION' ||
                        parseFloat(item.profit.percentage) == 0
                      "
                      >0%</strong
                    >

                    <span
                      v-if="parseFloat(item.profit.value) < 0"
                      class="danger--text text-subtitle-2 font-weight-bold"
                      >{{ item.profit.value }} USDT</span
                    >
                    <span
                      v-else
                      class="success--text text-subtitle-2 font-weight-bold"
                      >{{ item.profit.value }} USDT</span
                    >
                  </div>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip
                    v-if="item.status == 'WAITING_POSITION'"
                    class="orange--text font-weight-bold"
                    color="customYellow lighten-2"
                    small
                    label
                  >
                    Waiting for Position
                  </v-chip>
                  <v-chip
                    v-if="item.status == 'ACTIVE'"
                    small
                    class="white--text font-weight-bold"
                    color="success"
                    label
                  >
                    Active
                  </v-chip>
                  <v-chip
                    v-if="item.status == 'INACTIVE'"
                    small
                    color="grey"
                    dark
                    label
                  >
                    Inactive
                  </v-chip>
                  <v-chip
                    v-if="item.status == 'BLACKLISTED'"
                    small
                    color="danger"
                    dark
                    label
                  >
                    Blacklisted
                  </v-chip>

                  <v-chip
                    v-if="item.status == 'PAUSED'"
                    small
                    color="grey"
                    dark
                    label
                  >
                    Paused
                  </v-chip>
                </template>
                <template v-slot:no-data>
                  <BaseNoData
                    v-if="!selectedExchangeActive"
                    :label="`No automated bots`"
                  ></BaseNoData>
                  <BaseNoDataAutomatedBots
                    v-else
                    :label="`Assembling automated bots`"
                  ></BaseNoDataAutomatedBots>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <v-tab-item key="Daily Profit">
            <ProfitHistory :key="`${counter}-profitR`" ref="profitRef" />
          </v-tab-item>

          <v-tab-item key="All Trading History">
            <TradingHistory :key="`${counter}-tradingR`" ref="tradingRef" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>

    <v-col cols="12"> </v-col>
  </v-row>
  <v-row class="pa-1 ma-0" v-else-if="this.user">
    <BaseModal @close="test1 = false" :parentModel="test1" :maxWidth="'650'">
      <ModalsLearnHowItWorks
        @close-modal="test1 = false"
      ></ModalsLearnHowItWorks>
    </BaseModal>
    <v-dialog persistent v-if="showAddBot" v-model="showAddBot" max-width="600">
      <template>
        <ModalsBotSetup
          :bot-prop="selectedBot"
          :exchange="selectedExchange"
          @close-modal="closeModal"
        />
      </template>
    </v-dialog>
    <ModalsActivePosition
      v-if="showActivePosition"
      :persistent="true"
      :detail="botsDetail"
      :pair="selectedPair"
      :parentModel="showActivePosition"
      @close-modal="closeModal"
      @close="showActivePosition = false"
    />
    <v-dialog v-model="dialogDelete" max-width="400px" persistent>
      <v-card>
        <v-card-title class="headline"> Delete Bot Confirmation </v-card-title>
        <v-card-text>
          Are you sure you want to delete this bot setup?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="deleteItemConfirm"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      dark
      bottom
      color="success"
      elevation="15"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-row
      v-if="showExchangeCards && userExchangesLoaded"
      cols="12"
      class="px-0"
    >
      <v-col v-for="(exchange, index) in exchanges" :key="index" cols="12">
        <v-card
          style="position: relative"
          :class="
            exchange.comingsoon
              ? 'd-flex align-center justify-center exchange-card disabled'
              : 'd-flex align-center justify-center exchange-card'
          "
          flat
        >
          <v-row justify="center" align="center" class="pa-1 ma-0">
            <v-col
              @click="selectExchangeCard(`${exchange.name}`, exchange, index)"
              cols="5"
              class="d-flex justify-center align-center"
              style="position: relative"
            >
              <div class="custom-avatar off-white-3">
                <v-img contain :src="exchange.image"></v-img>
              </div>
              <h4 class="text-body-1 font-weight-bold ml-3">
                {{ exchange.name }}
              </h4>
            </v-col>
            <v-col
              cols="7"
              class="d-flex justify-center align-center"
              v-if="expansionPanel == exchange.name"
            >
              <template v-if="exchange.active">
                <v-btn
                  @click="_addBot(exchange)"
                  class="mx-2"
                  fab
                  x-small
                  outlined
                  color="primary"
                >
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  @click="_deleteBot(exchange)"
                  class="mx-2"
                  fab
                  x-small
                  outlined
                  color="danger"
                >
                  <v-icon dark> mdi-delete </v-icon>
                </v-btn></template
              >

              <v-btn
                v-else
                :disabled="
                  !user.subscription ||
                  user.subscription == false ||
                  exchange.comingsoon
                "
                @click="_addBot(exchange)"
                class="mx-2"
                small
                color="primary"
              >
                <!-- <v-icon dark> mdi-cog </v-icon> -->
                <span>Create your bot</span>
              </v-btn>
              <v-btn
                @click="expandExchange(exchange.name)"
                class="mx-2"
                fab
                x-small
                outlined
                color="primary"
              >
                <v-icon dark> mdi-chevron-up </v-icon>
              </v-btn>
              <v-list-item-avatar
                v-if="exchange.selected"
                size="25"
                color="#27D79E"
              >
                <v-icon color="white" small> mdi-check </v-icon>
              </v-list-item-avatar>
            </v-col>
            <v-col cols="7" class="d-flex justify-center align-center" v-else>
              <v-btn
                @click="expandExchange(exchange.name)"
                class="mx-2"
                fab
                x-small
                outlined
                color="primary"
              >
                <v-icon dark> mdi-chevron-down </v-icon>
              </v-btn>
              <v-list-item-avatar
                v-if="exchange.selected"
                size="25"
                color="#27D79E"
              >
                <v-icon color="white" small> mdi-check </v-icon>
              </v-list-item-avatar>
            </v-col>
            <v-expand-transition>
              <v-col cols="12" v-if="expansionPanel == exchange.name">
                <v-row>
                  <v-col
                    cols="12"
                    v-for="(item, i) in exchange.summary"
                    :key="`item-summary-${i}`"
                  >
                    <v-card flat rounded color="off-white">
                      <v-list-item>
                        <v-icon size="20" class="mr-4" color="primary">
                          {{ _determineIcon(item.title) }}
                        </v-icon>

                        <v-list-item-content>
                          <v-list-item-title class="text-body-2">
                            {{ item.title }}
                          </v-list-item-title>

                          <v-list-item-subtitle
                            class="text-body-1 font-weight-bold basic-text--text"
                          >
                            <template v-if="i == 1 || i == 3">
                              {{ item.value | toCurrency }}</template
                            >
                            <template v-else> {{ item.value }}</template>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-expand-transition>
          </v-row>
          <!-- ORNAMENTS -->

          <div v-if="exchange.selected" class="ornament o1"></div>
          <!-- ORNAMENTS END -->
        </v-card>
      </v-col>
    </v-row>

    <v-row
      v-else-if="showExchangeCards && !userExchangesLoaded"
      cols="12"
      class="px-0"
    >
      <v-col v-for="(exchange, index) in exchanges" :key="index" cols="12">
        <v-card
          style="position: relative"
          :class="
            exchange.comingsoon
              ? 'd-flex align-center justify-center exchange-card disabled'
              : 'd-flex align-center justify-center exchange-card'
          "
          flat
        >
          <v-row class="pa-1 ma-0">
            <v-col cols="8">
              <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
            </v-col>
            <v-col cols="4">
              <v-skeleton-loader type="button"> </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-col cols="12" class="mt-4">
      <v-btn
        rounded
        class="text-capitalize"
        color="primary"
        depressed
        block
        @click="test1 = true"
      >
        Learn how it works
      </v-btn>
    </v-col>

    <v-col cols="12" class="mb-4 text-center">
      <v-chip color="success" class="text-h6 font-weight-bold">
        Bots on {{ exchange }}
      </v-chip>
    </v-col>

    <v-col cols="12" :class="checkMobile() == false ? '' : 'pa-0 ma-0'">
      <v-card v-show="showTabs" class="mb-5" flat rounded>
        <v-tabs hide-slider :show-arrows="true" v-model="currentItem">
          <v-tab :ripple="false" v-for="item in tables" :key="item">
            <span class="text-body-1 text-capitalize">{{ item }}</span>
          </v-tab>
        </v-tabs>
      </v-card>
      <v-card class="pa-3" flat rounded>
        <v-tabs-items v-model="currentItem" :touchless="true">
          <v-tab-item key="Active Positions">
            <v-card :key="`${counter}-default`" flat>
              <v-row class="mb-3" justify="end" align="end">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="searchQuery"
                    placeholder="Search By Pair"
                    rounded
                    :hide-details="true"
                    class="custom-input off-white"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="mr-4 primary--text">mdi-magnify</v-icon>
                    </template></v-text-field
                  >
                </v-col>
              </v-row>
              <v-data-table
                style="overflow-y: scroll; height: 50vh; overflow-x: hidden"
                @click:row="_onSelectPair"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :headers="headers"
                :items="activePositionFiltered"
                :loading="isLoading"
                class="elevation-0"
                loading-text="Loading... Please wait"
              >
                <template v-slot:header.pair="{ header }">
                  <strong
                    class="basic-text--text text-body-1 font-weight-bold"
                    >{{ header.text }}</strong
                  >
                </template>
                <template v-slot:header.price="{ header }">
                  <strong
                    class="basic-text--text text-body-1 font-weight-bold"
                    >{{ header.text }}</strong
                  >
                </template>
                <template v-slot:header.profit="{ header }">
                  <strong
                    class="basic-text--text text-body-1 font-weight-bold"
                    >{{ header.text }}</strong
                  >
                </template>
                <template v-slot:header.status="{ header }">
                  <strong
                    class="basic-text--text text-body-1 font-weight-bold"
                    >{{ header.text }}</strong
                  >
                </template>

                <!-- hide-default-footer disable-pagination -->

                <template v-slot:item.pair="{ item }">
                  <v-row class="py-2">
                    <v-col cols="12" class="d-flex align-center justify-start">
                      <v-list-item-avatar class="ma-0">
                        <v-img
                          style="width: 28px !important"
                          @error="errorHandler"
                          max-width="28"
                          max-height="28"
                          :alt="item.logo"
                          :src="getImgUrl(item.pair_from)"
                        ></v-img>
                      </v-list-item-avatar>
                      <div class="d-flex flex-column ml-3">
                        <div class="d-flex">
                          <span class="text-subtitle-2 font-weight-bold"
                            >{{ item.pair_from }} / {{ item.pair_to }}
                          </span>
                        </div>
                        <span class="text-subtitle-2">{{ item.quantity }}</span>
                      </div>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.price="{ item }">
                  <div class="d-flex flex-column align-start justify-center">
                    <span class="text-subtitle-2 font-weight-bold">{{
                      item.price.value
                    }}</span>
                    <span
                      v-if="parseFloat(item.price.percentage) < 0"
                      class="danger--text text-subtitle-2 font-weight-bold"
                      >{{ item.price.percentage }}%</span
                    >
                    <span
                      v-else
                      class="success--text text-subtitle-2 font-weight-bold"
                      >{{ item.price.percentage }}%</span
                    >
                  </div>
                </template>
                <template v-slot:item.profit="{ item }">
                  <div class="d-flex flex-column align-start justify-center">
                    <!-- <code>{{item.status}}</code> -->
                    <strong
                      class="danger--text text-subtitle-2 font-weight-bold"
                      v-if="
                        item.status == 'ACTIVE' &&
                        parseFloat(item.profit.percentage) < 0
                      "
                      >{{ item.profit.percentage }}%</strong
                    >
                    <strong
                      class="success--text text-subtitle-2 font-weight-bold"
                      v-if="
                        item.status == 'ACTIVE' &&
                        parseFloat(item.profit.percentage) > 0
                      "
                      >{{ item.profit.percentage }}%</strong
                    >
                    <strong
                      class="primary--text text-subtitle-2 font-weight-bold"
                      v-if="
                        item.status == 'INACTIVE' ||
                        item.status == 'WAITING_POSITION' ||
                        parseFloat(item.profit.percentage) == 0
                      "
                      >0%</strong
                    >

                    <span
                      v-if="parseFloat(item.profit.value) < 0"
                      class="danger--text text-subtitle-2 font-weight-bold"
                      >{{ item.profit.value }} USDT</span
                    >
                    <span
                      v-else
                      class="success--text text-subtitle-2 font-weight-bold"
                      >{{ item.profit.value }} USDT</span
                    >
                  </div>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip
                    v-if="item.status == 'WAITING_POSITION'"
                    class="orange--text font-weight-bold"
                    color="customYellow lighten-2"
                    small
                    label
                  >
                    Waiting for Position
                  </v-chip>
                  <v-chip
                    v-if="item.status == 'ACTIVE'"
                    small
                    class="white--text font-weight-bold"
                    color="success"
                    label
                  >
                    Active
                  </v-chip>
                  <v-chip
                    v-if="item.status == 'INACTIVE'"
                    small
                    color="grey"
                    dark
                    label
                  >
                    Inactive
                  </v-chip>
                  <v-chip
                    v-if="item.status == 'BLACKLISTED'"
                    small
                    color="danger"
                    dark
                    label
                  >
                    Blacklisted
                  </v-chip>

                  <v-chip
                    v-if="item.status == 'PAUSED'"
                    small
                    color="grey"
                    dark
                    label
                  >
                    Paused
                  </v-chip>
                </template>
                <template v-slot:no-data>
                  <BaseNoData
                    v-if="!selectedExchangeActive"
                    :label="`No automated bots`"
                  ></BaseNoData>
                  <BaseNoDataAutomatedBots
                    v-else
                    :label="`Assembling automated bots`"
                  ></BaseNoDataAutomatedBots>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <v-tab-item key="Daily Profit">
            <ProfitHistory :key="`${counter}-profitR`" ref="profitRef" />
          </v-tab-item>

          <v-tab-item key="All Trading History">
            <TradingHistory :key="`${counter}-tradingR`" ref="tradingRef" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>

    <v-col cols="12"> </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

import Form from "~/pages/bots/form.vue";
import TradingHistory from "@/pages/transaction-history/trading-history.vue";
import ProfitHistory from "@/pages/transaction-history/profit-history.vue";
export default {
  layout: "account",
  components: {
    Form,
    TradingHistory,
    ProfitHistory,
  },
  data() {
    return {
      test1: false,
      counter: 0,
      currentItem: "Active Positions",
      tables: ["Active Positions", "Daily Profit", "All Trading History"],

      dialog: true,
      dialogDelete: false,
      // START OF CARD EXCHANGE
      selectedExchange: null,
      selectedExchangeReport: null,
      fetchingExchange: null,
      fetchedExchange: null,
      exchangeName: "Binance",
      exchanges: [
        {
          name: "Binance",
          selected: false,
          active: false,
          image: "/exchange_logo/binance.png",
          comingsoon: false,
          summary: [
            { value: "-", title: "Strategy" },
            { value: "-", title: "Total Allocated USDT" },
            { value: "-", title: "Technical Analysis" },
            { value: "-", title: "Minimum Trading Volume" },
          ],
        },
        // {
        //   name: "Bybit",
        //   selected: false,
        //   active: false,
        //   image: "/exchange_logo/bybit.png",
        //   comingsoon: false,
        // },
        {
          name: "Kucoin",
          selected: false,
          active: false,
          image: "/exchange_logo/kucoin.png",
          comingsoon: false,
          summary: [
            { value: "-", title: "Strategy" },
            { value: "-", title: "Total Allocated USDT" },
            { value: "-", title: "Technical Analysis" },
            { value: "-", title: "Minimum Trading Volume" },
          ],
        },
        // {
        //   name: "Tokocrypto",
        //   selected: false,
        //   active: false,
        //   image: "/exchange_logo/tokocrypto.png",
        //   comingsoon: true,
        // },
      ],
      selectedBot: null,
      userExchanges: [],
      userExchangesLoaded: false,
      // END OF CARD EXCHANGE
      headers: [
        {
          text: "Name / Qty",
          value: "pair",
          align: "start",
        },
        {
          text: "Price/24H Change",
          value: "price",
          align: "start",
        },
        {
          text: "Profit/Floating",
          value: "profit",
          align: "start",
        },
        {
          text: "Status",
          value: "status",
          align: "start",
        },
      ],

      items: [],
      id: null,
      editedItem: {
        name: "",
        exchange: "",
        api_key: "",
        secret_key: "",
      },
      defaultItem: {
        name: "",
        exchange: "",
        api_key: "",
        secret_key: "",
      },
      snackbar: false,
      snackbarText: "My timeout is set to 2000.",
      snackbarTimeout: 5000,

      // MODAL ADD EXCHANGE
      isLoading: false,

      listener: null,
      pnl: 0,
      dialog: false,
      dialogDelete: false,

      // ACTIVE POSITIONS
      // MODAL ADD EXCHANGE
      showAddBot: false,

      // MODAL SHOW ACTIVE POSITION
      botsDetail: null,
      selectedPair: null,
      showActivePosition: false,

      // ACTIVE POSITION FROM STORE
      activePosition: [],
      socket: null,

      // SELECT TO DELETE
      selectToDelete: null,

      // SEARCH
      searchQuery: null,

      // SORTING
      sortBy: null,
      sortDesc: null,
      availablePair: [],
      availableSorting: [
        {
          id: "symbol",
          name: "Trading Pair",
        },
      ],
      pairSelected: null,
      sortSelected: null,
      ascending: false,
      descending: false,

      listOfSockets: [],

      selectedExchangeActive: false,
      expansionPanel: 1,
    };
  },
  props: {
    showExchangeCards: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    showTabs: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },

  computed: {
    formTitle() {
      return this.id === null ? "Add New" : "Edit";
    },
    user() {
      return this.$store.state.authUser;
    },
    currentUser() {
      return this.$store.$fire.auth.currentUser;
    },
    activePositionFiltered() {
      let temp = this.activePosition;
      if (this.searchQuery != "" && this.searchQuery) {
        temp = temp.filter((position) => {
          return position.symbol
            .toUpperCase()
            .includes(this.searchQuery.toUpperCase());
        });
      }
      if (this.sortBy) {
        if (this.sortBy == "pair") {
          // sortBy = 'symbol'
          temp = this.sortDesc
            ? temp.sort((a, b) =>
                a.symbol > b.symbol ? 1 : b.symbol > a.symbol ? -1 : 0
              )
            : temp.sort((a, b) =>
                a.symbol < b.symbol ? 1 : b.symbol < a.symbol ? -1 : 0
              );
        } else if (this.sortBy == "price") {
          temp = this.sortDesc
            ? temp.sort((a, b) =>
                a.price.value > b.price.value
                  ? 1
                  : b.price.value > a.price.value
                  ? -1
                  : 0
              )
            : temp.sort((a, b) =>
                a.price.value < b.price.value
                  ? 1
                  : b.price.value < a.price.value
                  ? -1
                  : 0
              );
        } else if (this.sortBy == "profit") {
          temp = this.sortDesc
            ? temp.sort((a, b) =>
                a.profit.value > b.profit.value
                  ? 1
                  : b.profit.value > a.profit.value
                  ? -1
                  : 0
              )
            : temp.sort((a, b) =>
                a.profit.value < b.profit.value
                  ? 1
                  : b.profit.value < a.profit.value
                  ? -1
                  : 0
              );
        } else {
          temp.sort((a, b) => {
            if (a.status > b.status) return 1;
            if (a.status < b.status) return -1;
            return 0;
          });
        }
      } else {
        temp.sort((a, b) => {
          if (a.status > b.status) return 1;
          if (a.status < b.status) return -1;
          return 0;
        });
      }

      return temp;
    },
    exchange() {
      return this.$store.state.exchange.selectedExchange;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    exchange(val) {
      this.counter++;
      // this._fetchBotsList(val);
    },
  },
  async mounted() {
    console.log("USER!!", this.user);
    this.userExchangesLoaded = false;

    if (this.exchange) {
      // await this._fetchBotsList(this.exchange); // Fetch Bots List
      await this._fetchUserExchange(); // Fetch User Exchang
    } else {
      await this._fetchUserExchange(); // Fetch User Exchang
      // await this._fetchBotsList(this.exchange); // Fetch Bots List
    }

    this.userExchangesLoaded = true;

    // BOTS SOCKET
    this.initialStream(this.listenStream);
  },
  unmounted() {},
  beforeDestroy() {
    // this.socket?.close();
    // this.socket.emit("disconnect-client", {
    //     ok: "unsubs from bots"
    // });
  },
  methods: {
    ...mapActions("position", ["fetchPosition"]),
    listenStream() {
      this.realtimeUpdateSocket.on("bots-insert", (data) => {
        console.log("LISTEN bots insert", data);

        if (data.exchange == this.exchange) {
          console.log("SAME EXCHANGE bots insert", this.exchange);
          this.activePosition.push(data);
        }
      });
      this.realtimeUpdateSocket.on("bots-update", (data) => {
        console.log("LISTEN bots update", data);

        if (data.exchange == this.exchange) {
          console.log("SAME EXCHANGE bots update", this.exchange);
          let index = this.activePosition.findIndex(
            (b) => b.symbol == data.symbol
          );
          if (index < 0) return;
          this.activePosition[index] = data;
        }
      });
      this.realtimeUpdateSocket.on("bots-delete", (data) => {
        console.log("LISTEN bots delete", data);
        let index = this.activePosition.findIndex((b) => b._id == data);
        if (index < 0) return;
        this.activePosition.splice(index, 1);
      });
    },
    refetch() {
      for (let index = 0; index < this.exchanges.length; index++) {
        this.exchanges[index].selected = false;
      }
      this._fetchUserExchange();
    },
    getImgUrl(val) {
      try {
        let url = require("@/static/token_logo/" + val.toUpperCase() + ".png");
        return "/token_logo/" + val.toUpperCase() + ".png";
      } catch (err) {
        // console.log("img not exist", val);
        return "/token_logo/default.png";
      }
    },
    errorHandler(event) {
      event.target.src = "/token_logo/default.png";
    },
    _sort() {
      console.log(this.activePositionFiltered);
    },
    test() {
      this.activePosition.sort((a, b) => {
        return a.profit.value - b.profit.value;
      });
    },
    async _disconnectSocket() {
      console.log("disconnect");
      this.$socket.removeAllListeners("position");
    },
    //FETCH API
    async _fetchUserExchange() {
      let res = await this.$api.$get("/user/bot", {});
      console.log("fetchUSerExchange", res);
      if (res.data.length > 0) {
        let setups = res.data;
        let availableExchangeSetups = [];
        res.data.forEach((val) => {
          availableExchangeSetups.push(val.selected_exchange);
        });

        this.userExchanges = res.data;
        this.exchanges.forEach((exchange, exchangeIndex) => {
          let indexOf = availableExchangeSetups.indexOf(exchange.name);
          console.log(
            `indexOf: ${indexOf} ${exchange.name}`,
            res.data[indexOf]
          );
          exchange.summary = this.mapSummary(null, true);
          if (indexOf >= 0) {
            exchange.active = true;
            exchange.data = res.data[indexOf];
            exchange.summary = this.mapSummary(exchange.data);

            if (!this.exchange) {
              this.selectExchangeCard(
                `${exchange.name}`,
                exchange,
                exchangeIndex
              );
            } else {
              if (this.exchange == exchange.name) {
                this.selectExchangeCard(
                  `${exchange.name}`,
                  exchange,
                  exchangeIndex
                );
              }
            }
          } else {
            exchange.active = false;
          }
        });

        console.log(this.exchanges);
      } else {
        // this.$store.commit("setShowSnackbar", {
        //   show: true,
        //   message: "You don't have any active bot, please create one!",
        //   color: "customPink",
        // });
      }
    },
    streamBinance() {
      let stateStream = this.$store.state.socket.streamTicker;
      console.log("stateStream", stateStream);
      if (!stateStream) {
        return alert("no stream data detected");
      }
      this.socket = stateStream;
      this.socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        let index = this.activePosition.findIndex((b) => b.symbol == data.s);
        if (index < 0) return;
        this.activePosition[index].price.value = data.c;
        this.activePosition[index].price.percentage = data.P;

        // PNL CALCULATION
        if (this.activePosition[index].quantity > 0) {
          // AVERAGE  = TOTAL AMOUNT USD / TOTAL QUANTITY (depends on the positions array);
          // data.c   = Current Price (from binance stream)
          let average = parseFloat(this.activePosition[index].average);
          let percentage =
            average == 0 ? 0 : (parseFloat(data.c) - average) / average;
          let pnl =
            parseFloat(this.activePosition[index].amountUsd) * percentage;

          percentage = pnl / this.activePosition[index].amountUsd;

          // Floating P&L
          this.activePosition[index].floatingProfit = {};
          this.activePosition[index].floatingProfit.value = pnl.toFixed(3);
          this.activePosition[index].floatingProfit.percentage = (
            percentage * 100
          ).toFixed(3);

          // Realized P&L
          this.activePosition[index].realizedProfit = {};
          this.activePosition[index].realizedProfit.value =
            this.activePosition[index].grid_profit.toFixed(3);
          this.activePosition[index].realizedProfit.percentage =
            this.activePosition[index].amountUsd > 0
              ? (
                  (this.activePosition[index].grid_profit /
                    this.activePosition[index].amountUsd) *
                  100
                ).toFixed(3)
              : 0;

          // Total P&L
          pnl += this.activePosition[index].grid_profit;
          percentage = pnl / this.activePosition[index].amountUsd;
          this.activePosition[index].profit.value = pnl.toFixed(3);

          /**
           * 1. Floating P&L  ()
           * 2. Realized P&L  ()
           * 3. Total P&L     ()
           */

          let convertPercentage = percentage * 100;
          this.activePosition[index].profit.percentage =
            convertPercentage.toFixed(3);
        }
      };
    },
    async _fetchBotsList(exchangeName) {
      console.log(
        "!!! BEGINNING OF _fetchBotsList: Exchange comparison",
        " FETCHING: ",
        this.fetchingExchange,
        " FETCHED: ",
        this.fetchedExchange,
        " ASKED: ",
        exchangeName
      );
      if (
        this.fetchedExchange == exchangeName ||
        this.fetchingExchange == exchangeName
      ) {
        return;
      }

      this.isLoading = true;

      // if (this.socket) this.socket?.close();

      this.fetchingExchange = exchangeName;
      this.$api
        .$get("/user/bot-user", {
          params: {
            exchange: exchangeName,
          },
        })
        .then((res) => {
          console.log(
            "RESULT OF _fetchBotsList: Exchange comparison",
            this.selectedExchangeReport,
            exchangeName
          );
          if (this.selectedExchangeReport != exchangeName) {
            return;
          }
          this.activePosition = res.data;
          this.availablePair = res.pairs;
          this.streamBinance();

          this.fetchedExchange = exchangeName;
        })
        .catch((err) => {
          this.fetchedExchange = null;
        })
        .finally(() => {
          this.isLoading = false;
          this.fetchingExchange = null;
        });
    },
    async _fetchPosition(sorting) {
      let exchange = this.selectedExchangeReport;
      let symbol = this.pairSelected;
    },

    // LISTENER
    closeModal(val) {
      console.log("val close modal", val);
      this.showAddBot = val;
      this.showActivePosition = val;
    },
    // END OF LISTENER

    // LOGGER
    logger() {
      console.log(this.userExchanges);
    },

    // TRIGGER
    async _deleteBot(val) {
      this.selectToDelete = val;
      this.dialogDelete = true;
    },
    selectExchangeCard(val, exchange, index) {
      if (exchange.comingsoon) return;

      if (!exchange.active) {
        // return this.$store.commit("setShowSnackbar", {
        //   show: true,
        //   message: "Setup not found. Please setup bots for this exchange",
        //   color: "customPink",
        // });
        return;
      }

      this.$store.commit("exchange/setSelectedExchange", val);

      this.selectedExchangeReport = val;
      for (let i = 0; i < this.exchanges.length; i++) {
        this.exchanges[i].selected = false;
      }

      this.exchanges[index].selected = true;
      this.selectedExchangeActive = this.exchanges[index].active;

      // RE-FETCH LIST
      this._fetchBotsList(val);
    },
    async _onSelectPair(val) {
      console.log("selectedPair", val);
      this.$store.commit("setIsLoading", true);
      let res = await this.$api.$get("/user/active-position-detail", {
        params: {
          id: val._id,
        },
      });
      try {
        console.log("resSelectPair", res);
        this.selectedPair = val;
        this.botsDetail = res.data;
        this.showActivePosition = true;
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Error get bot detail",
            color: "customPink",
          });
        });
      }
    },
    async _addBot(val) {
      // CHECK IF EXCHANGE EXISTS
      this.$store.commit("setIsLoading", true);
      try {
        let res = await this.$api.$get("/user/exchange");
        let valid = false;
        for (let index = 0; index < res.data.length; index++) {
          const exchange = res.data[index];
          if (exchange.exchange_name == val.name) {
            valid = true;
            break;
          }
        }

        if (!valid) {
          this.$store.commit("setIsLoading", false);
          return this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Setup for " + val.name + " exchange not found",
            color: "danger",
            buttonMessage: "Setup " + val.name,
            buttonPath: "/exchanges",
          });
        }
      } catch (error) {
        this.$store.commit("setIsLoading", false);
        return this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Exchange checking error",
          color: "danger",
        });
      }

      console.log("addBot", val);
      this.$store.commit("exchange/setSelectedExchange", val.name);
      this.selectedExchange = val.name;
      if (val.active) {
        this.selectedBot = val.data;
      } else {
        this.selectedBot = null;
      }

      this.$store.commit("bot/setSelectedBot", this.selectedBot);
      this.$store.commit("setIsLoading", false);
      this.$router.push("/bots/new");
      // this.showAddBot = true;
    },

    addItem() {
      this.id = null;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },
    editItem(item) {
      this.id = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.id = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      this.$store.commit("setIsLoading", true);
      console.log(this.selectToDelete);
      let bot = this.selectToDelete;

      if (!bot) {
        setTimeout(() => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Unable to get any setup data!",
            color: "customPink",
          });
          this.$store.commit("setIsLoading", false);
        });
        return;
      }

      this.$api
        .$delete("/user/bot", {
          params: {
            id: bot.data._id,
          },
        })
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            this.$store.commit("setShowSnackbar", {
              show: true,
              message: "Bot Successfuly Deleted!",
              color: "success",
            });
          });
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            this.$store.commit("setShowSnackbar", {
              show: true,
              message: err,
              color: "customPink",
            });
          });
        })
        .finally(() => {
          this.dialogDelete = false;
          this.$store.commit("setIsLoading", false);
          this.$router.go();
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.id = null;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.id = null;
      });
    },

    /**
     * Map summary
     * @param {*} data
     * @param {bool} use_default if true, use default placeholder value
     * Turn bot data into array of object, containing the same info summary like in new bots pages
     */
    mapSummary(data, use_default = false) {
      var result = [
        { value: "-", title: "Strategy" },
        { value: "-", title: "Total Allocated USDT" },
        { value: "-", title: "Technical Analysis" },
        { value: "-", title: "Minimum Trading Volume" },
      ];

      if (use_default) {
        return result;
      }

      try {
        result[0].value = data.strategy.style.name;
        result[1].value = data.strategy.usdt_to_apply;
        result[2].value = `${data.analysis.indicators[0].indicator} ${
          data.analysis.condition == "AND" ? "&" : "/"
        } ${data.analysis.indicators[1].indicator}`;
        result[3].value = data.analysis.minimum_trading_volume;
      } catch (err) {
        console.log("MAP SUMMARY: ", err);
      }

      return result;
    },

    /**
     * Determine Icon
     * @param {*} text
     * Choose custom icon based on title
     */
    _determineIcon(text) {
      switch (text) {
        case "Exchange":
          return "$vuetify.icon.ExchangeIcon";
        case "Strategy":
          return "$vuetify.icon.ProfitBarChartIcon";
        case "Total Allocated USDT":
          return "$vuetify.icon.CardWithdrawIcon";
        case "Technical Analysis":
          return "$vuetify.icon.ChartArrowUpIcon";
        case "Minimum Trading Volume":
          return "$vuetify.icon.MinimumTradingVolumeIcon";

        default:
          return "$vuetify.icon.ProfitBarChartIcon";
      }
    },

    expandExchange(value) {
      if (this.expansionPanel == value) {
        return (this.expansionPanel = null);
      }

      this.expansionPanel = value;
    },
  },
};
</script>



<style scoped>
.exchange-selected {
  position: absolute;
  bottom: -20px;
  right: 5px;
  background: #3394f8;
  color: white;
  padding: 0px 15px;
  border-radius: 0px 0px 15px 15px !important;
  font-size: 0.8rem;
}

.exchange-table-selected {
  background: #17576a;
  padding: 5px 25px;
  font-weight: bold;
  color: white;
  float: right;
  font-size: 0.8rem;
  border-radius: 15px 15px 0px 0px;
}

.exchange-active {
  outline: 2px solid #3394f8;
}

.delete-button {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 0.8rem;
}

.text-info {
  background: #177e89;
  color: white;
  border-radius: 10px;
  padding: 13px 10px;
}
.custom-input {
}

.ornament {
  position: absolute;
  width: 80%;
  height: 4px;
  border-radius: 8px;

  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
}

.exchange-checkmark {
  position: absolute;
  top: 2.5%;
  right: 4%;
}

.ornament.o1 {
  background: var(--primary);
}

.ornament.o2 {
  background: var(--primary);
}

.exchange-card {
  /* height: 100px; */
}

.exchange-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.custom-avatar {
  box-shadow: 0px 20px 25px #3394f81a;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  padding: 15px;
  width: 80px;
  height: 80px;
  border-radius: 100% !important;
  top: 0%;
  left: 0%;
  transform: translate(25%, -75%);
}

@media only screen and (max-width: 1023px) {
  .custom-avatar {
    box-shadow: unset;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    padding: 15px;
    width: 65px;
    height: 65px;
    border-radius: 100% !important;
    position: unset;
    transform: translate(0%, 0%);
  }

  .ornament {
    position: absolute;
    width: 40%;
    height: 4px;
    border-radius: 8px;

    left: 25%;
    top: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>

