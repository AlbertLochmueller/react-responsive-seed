import * as React from "react";
import {Component} from "react";
import {withRouter, RouteComponentProps} from "react-router";
import {Spinner} from "../../layout/components/Spinner/Spinner";
import {ErrorInline} from "../../layout/components/ErrorInline/ErrorInline";
import {IFilter} from "../verticals/newsletter/interfaces/NewsletterFilter";
import {FilterDetails} from "../components/MarketPlaceFilter";
import {getFilterDetailsFromRouteParams, pushFilterDetailsRoute} from "../../main/services/route-service";
import {
  getAccessibilities, getAuthenticationModes,
  getChargingFacilities, getPaymentOptions, getPlugs,
  getStatus
} from "../../evses/services/evse-client";
import {inject} from "../../utils/react";

export type FilterDetailsContainerProps = RouteComponentProps<{ filter: IFilter }>;

interface IToInject {
  getStatus: typeof getStatus;
  getAuthenticationModes: typeof getAuthenticationModes;
  getPlugs: typeof getPlugs;
  getChargingFacilities: typeof getChargingFacilities;
  getAccessibilities: typeof getAccessibilities;
  getPaymentOptions: typeof getPaymentOptions;
}

interface IFilterDetailsContainerState {
  filter: IFilter;
  isLoading: boolean;
  errorMessage?: string;
}

export class RawFilterDetailsContainer extends Component<FilterDetailsContainerProps & IToInject, IFilterDetailsContainerState> {

  constructor() {
    super();

    this.state = {
      filter: {},
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadFilterPreset();
  }

  componentWillReceiveProps() {
    this.applyPresetFilters();
  }

  loadFilterPreset() {
    this.setState({
      isLoading: true,
      errorMessage: ''
    });

    this.loadFilters()
      .then(() => {
        this.setState({
          isLoading: false
        }, () => {
          this.applyPresetFilters();
        });
      });

  }

  loadFilters() {
    return Promise.all([
      this.loadStatus(),
      this.loadAuthenticationModes(),
      this.loadPlugs(),
      this.loadChargingFacilities(),
      this.loadAccessibilities(),
      this.loadPaymentOptions(),
    ]);
  }

  loadStatus() {
    return this.props.getStatus()
      .then(result => {
        this.setState({
          filter: {
            ...this.state.filter,
            status: result.data
          }
        });
      });
  }

  loadChargingFacilities() {
    return this.props.getChargingFacilities()
      .then(result => {
        this.setState({
          filter: {
            ...this.state.filter,
            chargingFacilities: result.data
          }
        });
      });
  }

  loadPaymentOptions() {
    return this.props.getPaymentOptions()
      .then(result => {
        this.setState({
          filter: {
            ...this.state.filter,
            paymentOptions: result.data
          }
        }, () => {
          this.applyPresetFilters();
        });
      });
  }

  loadAccessibilities() {
    return this.props.getAccessibilities()
      .then(result => {
        this.setState({
          filter: {
            ...this.state.filter,
            accessibility: result.data
          }
        });
      });
  }

  loadPlugs() {
    return this.props.getPlugs()
      .then(result => {
        this.setState({
          filter: {
            ...this.state.filter,
            plugs: result.data
          }
        });
      });
  }

  loadAuthenticationModes() {
    return this.props.getAuthenticationModes()
      .then(result => {
        this.setState({
          filter: {
            ...this.state.filter,
            authenticationModes: result.data
          }
        });
      });
  }

  applyPresetFilters() {
    let selectedFilterPreset = getFilterDetailsFromRouteParams();

    if (selectedFilterPreset) {
      selectedFilterPreset = Object.keys(selectedFilterPreset).reduce((result, key) => {
        result[key.replace('exclude.', '')] = selectedFilterPreset[key];
        return result;
      }, {});

      const {filter} = this.state;
      const selectedFilter = Object.keys(filter).reduce((result, filterTypeKey) => {
        const types: Array<{ id: number; isExcluded: boolean }> = filter[filterTypeKey];
        const excludedTypeIds: string[] = selectedFilterPreset[filterTypeKey] || [];

        result[filterTypeKey] = types.map(type => ({
          ...type,
          isExcluded: !!excludedTypeIds.find(id => parseInt(id, 10) === type.id)
        }));

        return result;
      }, {});

      this.setState({filter: selectedFilter});
    }
  }

  handleErrorRefresh() {
    this.loadFilterPreset();
  }

  handleFilterChange(change) {
    pushFilterDetailsRoute(this.props, change);
  }

  render() {
    const {filter, isLoading, errorMessage} = this.state;

    if (errorMessage) {
      return (
        <ErrorInline text={errorMessage}
                     onRefresh={() => this.handleErrorRefresh()}
        />
      );
    }
    if (isLoading) {
      return (
        <Spinner/>
      );
    }
    return (
      <div className="filter-details-container" style={{height: "100%"}}>{filter && (<FilterDetails
        filter={filter}
        onChange={change => this.handleFilterChange(change)}
      />)}</div>
    );
  }
}

export const FilterDetailsContainer = inject<{}, IToInject>({
  getStatus,
  getAuthenticationModes,
  getPlugs,
  getChargingFacilities,
  getAccessibilities,
  getPaymentOptions
})(withRouter(RawFilterDetailsContainer));
