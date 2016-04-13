import React from 'react';
import Griddle from 'griddle-react';

class MeteorGriddle extends MainApp.Views.BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      maxPages: 0,
      externalResultsPerPage: this.props.externalResultsPerPage,
      externalSortColumn: this.props.externalSortColumn,
      externalSortAscending: this.props.externalSortAscending,
      filter: null,
      results: [],
      matchingResults: 0
    };
    let query = {};
    // get a count of the number of items matching the current filter
    // if no filter is set it will return the total number of items in the collection
    this.autorun(() => {
      this.setState({matchingResults: Meteor.isClient ? Counts.get(this.props.matchingResultsCount) :
        this.props.collection.find().count()});
      let options = {
        limit: this.state.externalResultsPerPage, sort: {},
      };
      // filtering
      if (this.state.filter) {
        // if filteredFields are not defined, default to using columns
        let filteredFields = this.props.filteredFields || this.props.columns;
        // if necessary, limit the cursor to number of matching results to avoid displaying results from other publications
        options.limit = _.min([options.limit, this.state.matchingResults]);
        // build array for filtering using regex
        let orArray = filteredFields.map((field) => {
          let filterItem = {};
          filterItem[field] = {$regex: this.state.filter, $options: 'i'};
          return filterItem;
        });
        query = {$or: orArray};
      }
      // sorting
      options.sort[this.state.externalSortColumn] = this.state.externalSortAscending ? 1 : -1;
      // skipping
      let skip = this.state.currentPage * this.state.externalResultsPerPage;
      // we extend options with skip before passing them to publication
      this.subscribe(this.props.publication, query, _.extend({skip: skip}, options));
      // create the cursor
      this.setState({results: this.props.collection.find(query, options).fetch()});
    });
  }
  //what page is currently viewed
  setPage(index) {
    this.setState({currentPage: index});
  }
  //this changes whether data is sorted in ascending or descending order
  changeSort(sort, sortAscending) {
    this.setState({externalSortColumn: sort, externalSortAscending: sortAscending});
  }
  //this method handles the filtering of the data
  setFilter(filter) {
    this.setState({filter: filter});
  }
  //this method handles determining the page size
  setPageSize(size) {
    this.setState({externalResultsPerPage: size});
  }
  render() {
    // figure out how many pages we have based on the number of total results matching the cursor
    const maxPages = Math.round(this.state.matchingResults / this.state.externalResultsPerPage);
    const columnMetadata = this.props.columns.map(c => {
      return {
        columnName: c,
        displayName: this.props.collection.simpleSchema().label(c)
      };
    });
    return <Griddle
      {...this.props}
      sortAscendingComponent={<span className='fa fa-sort-alpha-asc'></span>}
      sortDescendingComponent={<span className='fa fa-sort-alpha-desc'></span>}
      useGriddleStyles={false}
      filteredFields={this.props.columns}
      showFilter={true}
      filterPlaceholderText={'Taper votre recherche'}
      showSettings={false}
      settingsText='Réglages'
      tableClassName='table'
      columns={this.props.columns}
      columnMetadata={columnMetadata}
      results={this.state.results}
      externalSetPage={this.setPage}
      externalChangeSort={this.changeSort}
      externalSetFilter={this.setFilter}
      externalSetPageSize={this.setPageSize}
      externalMaxPage={maxPages}
      externalCurrentPage={this.state.currentPage}
      resultsPerPage={this.state.externalResultsPerPage}
      externalSortColumn={this.state.externalSortColumn}
      externalSortAscending={this.state.externalSortAscending}
      nextText={''}
      nextClassName={'griddle-next-button'}
      previousText={''}
      previousClassName={'griddle-previous-button'}
    />;
  }
}

MeteorGriddle.propTypes = {
  publication: React.PropTypes.string, // the publication that will provide the data
  collection: React.PropTypes.object, // the collection to display
  matchingResultsCount: React.PropTypes.string, // the name of the matching results counter
  filteredFields: React.PropTypes.array, // an array of fields to search through when filtering plus regular Griddle props
  columns: React.PropTypes.array
};

MainApp.Views.MeteorGriddle = MeteorGriddle;