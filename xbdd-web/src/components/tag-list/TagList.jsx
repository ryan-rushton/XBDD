import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Report from '../../models/Report';
import TagListItem from './TagListItem';
import TagListFilterButtons from './TagListFilterButtons';

const styles = theme => ({
    xbddTagListContainer: {
        height: 'calc(100vh - 280px)',
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    xbddTagList: {
        position: 'relative',
        width: '100%',
        maxWidth: 360,
        height: 'calc(100% - 50px)',
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper,
    },
    xbddTagListFilterButtons: {
        height: '50px',
        width: '100%',
    },
    xbddFilterButton: {
        width: 90,
    },
});

class TagList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passedSelected: true,
            undefinedSelected: true,
            failedSelected: true,
            skippedSelected: true,
        };
        this.onFilterButtonClick = this.onFilterButtonClick.bind(this);
    }

    onFilterButtonClick(stateAttribute) {
        this.setState(prevState => ({
            [stateAttribute]: !prevState[stateAttribute],
        }));
    }

    filteredTags() {
        const tags = this.props.report.tagList;
        return tags.filter(tag => (this.state.passedSelected && tag.containsPassed)
            || (this.state.undefinedSelected && tag.containsUndefined)
            || (this.state.failedSelected && tag.containsFailed)
            || (this.state.skippedSelected && tag.containsSkipped));
    }

    renderList() {
        const tags = this.filteredTags();
        return (
            <List component="ul" >
                {tags.map(tag => <TagListItem tag={tag} key={tag.name} />)}
            </List>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={`${classes.xbddTagListContainer} xbdd-tab-list-container`}>
                <TagListFilterButtons
                    state={this.state}
                    onFilterButtonClick={this.onFilterButtonClick}
                />
                <div className={classes.xbddTagList}>
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

TagList.propTypes = {
    report: PropTypes.instanceOf(Report).isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagList);
