import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="istoreApp.customer.home.createOrEditLabel">
            <Translate contentKey="istoreApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="customer-firstName">
                  <Translate contentKey="istoreApp.customer.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="customer-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="customer-lastName">
                  <Translate contentKey="istoreApp.customer.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="customer-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="customer-gender">
                  <Translate contentKey="istoreApp.customer.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="customer-gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && customerEntity.gender) || 'MALE'}
                >
                  <option value="MALE">{translate('istoreApp.Gender.MALE')}</option>
                  <option value="FEMALE">{translate('istoreApp.Gender.FEMALE')}</option>
                  <option value="OTHER">{translate('istoreApp.Gender.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="customer-email">
                  <Translate contentKey="istoreApp.customer.email">Email</Translate>
                </Label>
                <AvField
                  id="customer-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: {
                      value: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
                      errorMessage: translate('entity.validation.pattern', { pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' }),
                    },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="customer-phone">
                  <Translate contentKey="istoreApp.customer.phone">Phone</Translate>
                </Label>
                <AvField
                  id="customer-phone"
                  type="text"
                  name="phone"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine1Label" for="customer-addressLine1">
                  <Translate contentKey="istoreApp.customer.addressLine1">Address Line 1</Translate>
                </Label>
                <AvField
                  id="customer-addressLine1"
                  type="text"
                  name="addressLine1"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine2Label" for="customer-addressLine2">
                  <Translate contentKey="istoreApp.customer.addressLine2">Address Line 2</Translate>
                </Label>
                <AvField id="customer-addressLine2" type="text" name="addressLine2" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="customer-city">
                  <Translate contentKey="istoreApp.customer.city">City</Translate>
                </Label>
                <AvField
                  id="customer-city"
                  type="text"
                  name="city"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="customer-country">
                  <Translate contentKey="istoreApp.customer.country">Country</Translate>
                </Label>
                <AvField
                  id="customer-country"
                  type="text"
                  name="country"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="customer-user">
                  <Translate contentKey="istoreApp.customer.user">User</Translate>
                </Label>
                <AvInput
                  id="customer-user"
                  type="select"
                  className="form-control"
                  name="user.id"
                  value={isNew ? users[0] && users[0].id : customerEntity.user?.id}
                  required
                >
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
